const Course = require("./../models/Course");
const Session = require("./../models/Session");
const CourseUser = require("./../models/Course-User");
const Category = require("./../models/Category");
const Comment = require("./../models/Comment");
const User = require("./../models/User");

const { isValidObjectId } = require("mongoose");


exports.getAllCourses = async (req, res, next) => {
  try {
      const user = req.user;
      

      const allCoursesCount = await Course.countDocuments({});
      
      const allCourses = await Course.find({}).lean();
      
      const { search, category, priceType, sort = 'newest', page = 1 } = req.query;
      
      let filter = {};
      
      
      if (search && search.trim() !== '') {
          filter.name = { $regex: search, $options: 'i' };
          console.log("🔍 Searching for:", search);
      }
      
      if (category && category !== '') {
          filter.categoryID = category;
      }
      
      if (priceType === 'free') {
          filter.price = 0;
      } else if (priceType === 'paid') {
          filter.price = { $gt: 0 };
      }
      
      
      let totalCourses = await Course.countDocuments(filter);
      

      if (totalCourses === 0 && Object.keys(filter).length > 0) {
        filter = {};
        totalCourses = await Course.countDocuments(filter);
    }
      
      const limit = 9;
      const pageNum = parseInt(page) || 1;
      const skip = (pageNum - 1) * limit;
      
      const courses = await Course.find(filter)
          .populate('categoryID', 'title href')
          .populate('teacher', 'name avatar')
          .sort(sort === 'priceAsc' ? { price: 1 } : 
                sort === 'priceDesc' ? { price: -1 } : 
                sort === 'oldest' ? { createdAt: 1 } : 
                { createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean();
      
      
      const categories = await Category.find({}).lean();
      
      return res.render("course/course.ejs", {
          courses,
          categories,
          user: user || null,
          totalCourses: totalCourses,
          totalPages: Math.ceil(totalCourses / limit),
          currentPage: pageNum,
          filters: { search: search || '', category: category || '', priceType: priceType || 'all', sort: sort || 'newest' }
      });
      
  } catch (error) {
    console.error("❌ Error:", error);
    const courses = await Course.find({}).populate('categoryID').lean();
    const categories = await Category.find({}).lean();
    return res.render("course/course.ejs", {
        courses, categories, user: req.user || null,
        totalCourses: courses.length, totalPages: 1, currentPage: 1,
        filters: {}
    });
  }
};

exports.showCreateCoursePanel = async (req, res, next) => {
  const categories = await Category.find({});
  const teachers = await User.find({roles: "TEACHER"});
  return res.render("course/createCourse.ejs", {categories, teachers})

}

exports.create = async (req, res) => {
  try {
    const {
      name,
      description,
      discount,
      support,
      href,
      price,
      status,
      categoryID,
      teacherId
    } = req.body;


    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'تصویر کاور الزامی است'
      });
    }


    const newCourse = await Course.create({
      name,
      description,
      discount: discount || 0,
      support: support || '',
      href: href || '',
      price: price || 0,
      status: status || 'recording',
      categoryID,
      creator: req.user._id,
      teacher: teacherId,
      cover: `${req.file.filename}`
    });


    return res.status(201).json({
      success: true,
      message: 'دوره با موفقیت ایجاد شد!',
      data: newCourse,
      redirect: '/'
    });

  } catch (error) {
    console.error('Error creating course:', error);
    

    return res.status(500).json({
      success: false,
      message: error.message || 'خطا در ایجاد دوره'
    });
  }
};
exports.createSessionPage = async (req, res) => {

    const course = await Course.findById(req.params.courseId).lean();
    if (!course) return res.redirect('/dashboard/teacher');
    
    const sessionCount = await Session.countDocuments({ course: course._id });
    
    return res.render('course/createSession', {
        course,
        nextOrder: sessionCount + 1,
        user: req.user,
        activePage: 'sessions'
    });

}

exports.createSession = async (req, res) => {

  const { time, free, title, description  } = req.body;
  const creatorId = req.user._id

  const { courseId } = req.params;

  if (!isValidObjectId(courseId)) {
    return res.status(409).json({
      message: "This Course ID is Not Valid !!",
    });
  }
  const count = await Session.countDocuments({ course: courseId });

  
  const session = await Session.create({
    order: count + 1,
    description: description || '',
    title,
    time,
    free,
    video: `/img/session/${req.file.filename}`,
    course: courseId,
    creator: creatorId

  });
  return res.status(201).json(session);
};

exports.getAllSession = async (req, res) => {
  const session = await Session.find().populate("course", "name").lean();
  return res.status(200).json(session);
};

exports.getOneSession = async (req, res) => {
  const course = await Course.findOne({ href: req.params.href });
  const session = await Session.findOne({ _id: req.params.sessionsID });
  const sessions = await Session.find({ course: course._id });
  return res.json({ session, sessions });
};

exports.removeSession = async (req, res) => {
  const deletedSession = await Session.findOneAndDelete({
    _id: req.params.id,
  });
  const isValidSessionID = isValidObjectId(req.params.id);
  if (!isValidSessionID) {
    return res.status(409).json({
      message: "This User ID is Not Valid !!",
    });
  }
  if (!deletedSession) {
    return res.status(404).json({
      message: "Session NOT FOUND",
    });
  }
  return res.json(deletedSession);
};

exports.register = async (req, res) => {
  const isUserAlreadyRegistered = await CourseUser
  .findOne({
    user: req.user._id,
    course: req.params.id,
  })
    .lean();
  if (isUserAlreadyRegistered) {
    return res.status(409).json({
      message: "You are Already registered",
    });
  }
  
  const register = await CourseUser.create({
    user: req.user._id,
    course: req.params.id,
    price: req.body.price,
  });
  return res.status(201).json({
    message: "You ARE Registered !",
  });
};

exports.getAllByCategory = async (req, res) => {
  const { href } = req.params;
  const category = await Category.findOne({ href: href });
  if (category) {
    const categoryCourse = await Course.find({
      categoryID: category._id,
    });
    return res.json(categoryCourse);
  } else {
    return res.json([]);
  }
};

exports.getOneCourse = async (req, res) => {
  const user = req.user;
  const { href } = req.params;
  
  const course = await Course.findOne({ href })
    .populate("categoryID", "-createdAt -updatedAt")
    .populate("creator", "-password -phone -email -username -role -__v -createdAt -updatedAt")
    .populate("teacher", "-password -phone -email -username -role -__v -createdAt -updatedAt")
    .lean();
    
    if (!course) {
      return res.render("course/course_details.ejs", { 
        course: null, comments: [], categories: [], user: null, 
        relatedCourses: [], sessions: [], isUserRegistered: false,
        error: "دوره مورد نظر یافت نشد" 
      });
    }
  
  const relatedCourses = await Course.find({
    _id: { $ne: course._id },
    categoryID: course.categoryID
  })
    .populate('teacher')
    .limit(4);
  
  const categories = await Category.find().sort({ title: 1 });

  const comments = await Comment.find({ course: course._id })
    .populate("user", "name avatar roles")
    .populate({
      path: "replies.user",
      model: "User",
      select: "name avatar roles"
    })
    .sort({ createdAt: -1 })
    .lean();

  const sessions = await Session.find({ course: course._id })
    .populate("course", "name")
    .sort({ createdAt: 1 })
    .lean();

  let isUserRegistered = false;
  if (user) {
    const enrollment = await CourseUser.findOne({ 
      user: user._id, 
      course: course._id 
    });
    isUserRegistered = !!enrollment;
  }
  const countStudents = await CourseUser.countDocuments({course: course._id })



  return res.render("course/course_details.ejs", {
    course,
    categories,
    user: user || null,
    relatedCourses,
    comments,
    sessions,
    isUserRegistered,
    countStudents
  });
};
