const express = require("express");
const auth = require("../middlewares/auth");
const Course = require("./../models/Course");
const Category= require("./../models/Category");
const Article= require("./../models/Article");
const User= require("./../models/User");
const Comment= require("./../models/Comment");



const router = express.Router();



router.get("/", auth, async (req, res) => {
    try {
        const user = req.user || null;        
        const [
            totalUsers,
            totalArticles,
            avgResult
        ] = await Promise.all([
            User.countDocuments(),
            Article.countDocuments({ status: 'published' }),
            Comment.aggregate([
                { $match: { rating: { $exists: true, $ne: null, $gte: 1, $lte: 5 } } },

                { $group: { _id: null, avg: { $avg: '$rating' } } },

            ])
        ]);
        const avg = avgResult[0]?.avg

        const courses = await Course.find({})
        .populate('categoryID', 'title href')
        .sort({ createdAt: -1 })
        .limit(6)
        .lean();
        const categories = await Category.find({})
        const articles = await Article.find({ status: "published" })
        .populate("category", "title")
        .sort({ createdAt: -1 })
        .limit(3) 
        .lean()

        const comments = await Comment.find({})
        .populate({
            path: "user",
            match: { roles: "USER" }
        })
        .populate("course", "name")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();
    
    const filteredComments = comments.filter(c => c.user !== null);

        const totalCourses = await Course.countDocuments();

        return res.render("index.ejs", { 
            courses: courses || [], 
            comments:filteredComments ,
            categories: categories ,
            totalCourses: totalCourses  ,
            articles: articles || [],
            totalUsers: totalUsers ,
            totalArticles: totalArticles ,
            averageRating: avg,
            user: user
        });

    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).send("خطای سرور در دریافت اطلاعات");
    }
});


module.exports = router