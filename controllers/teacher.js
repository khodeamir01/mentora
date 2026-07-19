const User = require("../models/User");
const Course = require("../models/Course");
const Session = require("../models/Session");
const Comment = require("../models/Comment");
const CourseUser = require("../models/Course-User");


exports.getAll = async (req, res) => {
    const teachers = await User.find({ roles: "TEACHER" })
        .select("name avatar bio")
        .lean();

    for (let teacher of teachers) {
        const courses = await Course.find({ teacher: teacher._id }).lean();
        teacher.courseCount = courses.length;
        teacher.studentCount = await CourseUser.countDocuments({ 
            course: { $in: courses.map(c => c._id) } 
        });
    }

    res.render("index", { teachers, user: req.user || null });
    res.render("teacher/instructor.ejs", { teachers, user: req.user || null });
};


exports.getOne = async (req, res) => {
    const user = req.user;
    const teacher = await User.findById(req.params.id)
        .select("name avatar bio email")
        .lean();
    
    if (!teacher) return res.redirect("/teachers");

    const courses = await Course.find({ teacher: teacher._id }).lean();
    const totalSessions = await Session.countDocuments({ creator: teacher._id });
    
    const avgResult = await Comment.aggregate([
        { $match: { course: { $in: courses.map(c => c._id) } } },
        { $group: { _id: null, avg: { $avg: "$rating" } } }
    ]);

    return res.render("teacher/ins_details", {
        teacher,
        courses,
        totalSessions,
        averageRating: avgResult[0]?.avg?.toFixed(1) || null,
        user: user || null
    });
};