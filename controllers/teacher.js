const User = require("../models/User");
const Course = require("../models/Course");
const Session = require("../models/Session");
const Comment = require("../models/Comment");


exports.getAll = async (req, res) => {
    const teachers = await User.find({ roles: "TEACHER" })
        .select("name avatar bio")
        .lean();
    res.render("instructor.ejs", { teachers, user: req.user || null });
};



exports.getOne = async (req, res) => {
    const teacher = await User.findById(req.params.id)
        .select("name avatar bio email")
        .lean();
    
    if (!teacher) return res.redirect("/teachers");

    const courses = await Course.find({ creator: teacher._id, status: "published" }).lean();
    const totalSessions = await Session.countDocuments({ creator: teacher._id });
    console.log(totalSessions);
    
    const avgResult = await Comment.aggregate([
        { $match: { course: { $in: courses.map(c => c._id) } } },
        { $group: { _id: null, avg: { $avg: "$rating" } } }
    ]);

    return res.render("ins_details", {
        teacher,
        courses,
        totalSessions,
        averageRating: avgResult[0]?.avg?.toFixed(1) || null,
        user: req.user || null
    });
};