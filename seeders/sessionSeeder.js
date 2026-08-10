// seeders/sessionSeeder.js
const mongoose = require("mongoose");
const Session = require("../models/Session");
const Course = require("../models/Course");
const User = require("../models/User");

const seedSessions = async () => {
    try {
        await Session.deleteMany({});
        console.log("🧹 Old sessions cleared");

        const teacher = await User.findOne({ roles: "TEACHER" });
        const courses = await Course.find({});
        const courseMap = {};
        courses.forEach(c => courseMap[c.name] = c._id);

        const sessions = [
            // Node.js Course
            { title: "معرفی Node.js و نصب ابزارها", description: "آشنایی با Node.js، نصب و راه‌اندازی", order: 1, isFree: true, course: courseMap["آموزش جامع Node.js"], creator: teacher._id, video: "/img/seeders/test1.mp4" },
            { title: "ماژول‌ها و require", description: "سیستم ماژولار Node.js", order: 2, isFree: true, course: courseMap["آموزش جامع Node.js"], creator: teacher._id, video: "/img/seeders/test2.mp4" },
            { title: "Express.js و Routing", description: "ساخت اولین سرور با Express", order: 3, isFree: false, course: courseMap["آموزش جامع Node.js"], creator: teacher._id, video: "/img/seeders/test3.mp4" },

            // Android Course
            { title: "معرفی کاتلین و Android Studio", description: "نصب و راه‌اندازی محیط توسعه", order: 1, isFree: true, course: courseMap["دوره توسعه اندروید با کاتلین"], creator: teacher._id, video: "/img/seeders/test1.mp4" },
            { title: "UI و Layoutها", description: "طراحی رابط کاربری", order: 2, isFree: true, course: courseMap["دوره توسعه اندروید با کاتلین"], creator: teacher._id, video: "/img/seeders/test2.mp4" },
            { title: "Retrofit و API", description: "ارتباط با سرور", order: 3, isFree: false, course: courseMap["دوره توسعه اندروید با کاتلین"], creator: teacher._id, video: "/img/seeders/test3.mp4" },

            // Frontend Course
            { title: "HTML5 Semantic", description: "ساختار صفحات وب", order: 1, isFree: true, course: courseMap["دوره آموزش فرانت‌اند با HTML, CSS, JS"], creator: teacher._id, video: "/img/seeders/test1.mp4" },
            { title: "CSS3 و Flexbox", description: "استایل‌دهی مدرن", order: 2, isFree: true, course: courseMap["دوره آموزش فرانت‌اند با HTML, CSS, JS"], creator: teacher._id, video: "/img/seeders/test2.mp4" },
            { title: "JavaScript Basics", description: "مبانی جاوااسکریپت", order: 3, isFree: false, course: courseMap["دوره آموزش فرانت‌اند با HTML, CSS, JS"], creator: teacher._id, video: "/img/seeders/test3.mp4" },

            // Tailwind Course
            { title: "نصب و راه‌اندازی Tailwind", description: "شروع کار با Tailwind CSS", order: 1, isFree: true, course: courseMap["آموزش Tailwind CSS - منتورشیپ"], creator: teacher._id, video: "/img/seeders/test1.mp4" },
            { title: "Utility Classes", description: "کلاس‌های کاربردی", order: 2, isFree: true, course: courseMap["آموزش Tailwind CSS - منتورشیپ"], creator: teacher._id, video: "/img/seeders/test2.mp4" },
            { title: "پروژه عملی", description: "ساخت لندینگ پیج", order: 3, isFree: false, course: courseMap["آموزش Tailwind CSS - منتورشیپ"], creator: teacher._id, video: "/img/seeders/test3.mp4" },
        ];

        const created = await Session.insertMany(sessions);
        console.log(`✅ ${created.length} sessions created`);
        created.forEach(s => console.log(`  ${s.title} (${s.isFree ? 'رایگان' : 'پولی'})`));
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

