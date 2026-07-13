const Category = require("../models/Category");
const Course = require("../models/Course");

module.exports = async (req, res, next) => {
    try {
        const categories = await Category.find({}).lean();
        const courses = await Course.find({})
            .populate("categoryID", "title")
            .lean();
        
        res.locals.categories = categories;
        res.locals.courses = courses;
        res.locals.user = req.user || null;
    } catch (error) {
        res.locals.categories = [];
        res.locals.courses = [];
        res.locals.user = req.user || null;
    }
    next();
};