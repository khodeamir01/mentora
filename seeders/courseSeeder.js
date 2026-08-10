const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

const seedCourses = async () => {
    try {
        await Course.deleteMany({});
        console.log("🧹 Old courses cleared");

        const categories = await Category.find({});
        const catMap = {};
        categories.forEach(c => catMap[c.title] = c._id);

        const teacher = await User.findOne({ roles: "TEACHER" });
        const admin = await User.findOne({ roles: "ADMIN" });

        const courses = [
            { name: "آموزش جامع Node.js", href: "nodejs-complete-course", description: "دوره جامع Node.js", price: 499000, status: "published", categoryID: catMap["Backend"], creator: admin._id, teacher: teacher._id, cover: "nodejs.jpg" },
            { name: "دوره توسعه اندروید با کاتلین", href: "android-kotlin-course", description: "آموزش اندروید با کاتلین", price: 599000, status: "published", categoryID: catMap["Mobile App"], creator: admin._id, teacher: teacher._id, cover: "kotlin.jpg" },
            { name: "دوره آموزش فرانت‌اند", href: "frontend-html-css-js", description: "یادگیری فرانت‌اند", price: 399000, status: "published", categoryID: catMap["Frontend"], creator: admin._id, teacher: teacher._id, cover: "frontend.png" },
            { name: "آموزش Tailwind CSS", href: "tailwind-mentorship", description: "یادگیری Tailwind", price: 299000, status: "published", categoryID: catMap["Frontend"], creator: admin._id, teacher: teacher._id, cover: "tailwind.jpg" },
        ];

        await Course.insertMany(courses);
        console.log("✅ Courses created");

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

module.exports = seedCourses;
