// seeders/courseSeeder.js
const mongoose = require("mongoose");
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
            { name: "آموزش جامع Node.js", href: "nodejs", description: "دوره جامع Node.js از صفر تا ساخت API حرفه‌ای", price: 499000, status: "published", categoryID: catMap["Backend"], creator: admin._id, teacher: teacher._id, cover: "nodejs.jpg" },
            { name: "دوره توسعه اندروید با کاتلین", href: "kotlin", description: "آموزش کامل برنامه‌نویسی اندروید با کاتلین", price: 599000, status: "published", categoryID: catMap["Mobile App"], creator: admin._id, teacher: teacher._id, cover: "kotlin.jpg" },
            { name: "دوره آموزش فرانت‌اند با HTML, CSS, JS", href: "frontend-bootcamp", description: "یادگیری کامل فرانت‌اند از پایه", price: 399000, status: "published", categoryID: catMap["Frontend"], creator: admin._id, teacher: teacher._id, cover: "frontend.jpg" },
            { name: "آموزش Tailwind CSS - منتورشیپ", href: "tailwind", description: "یادگیری Tailwind CSS از صفر تا حرفه‌ای", price: 299000, status: "published", categoryID: catMap["Frontend"], creator: admin._id, teacher: teacher._id, cover: "tailwind.jpg" },
        ];

        const created = await Course.insertMany(courses);
        console.log(`✅ ${created.length} courses created`);
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mentora").then(seedCourses);