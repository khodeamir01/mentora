// seeders/courseUserSeeder.js
const CourseUser = require("../models/Course-User");
const User = require("../models/User");
const Course = require("../models/Course");

const seedCourseUsers = async () => {
    try {
        await CourseUser.deleteMany({});
        console.log("🧹 Old course enrollments cleared");

        const users = await User.find({ roles: "USER" });
        const courses = await Course.find({ status: "published" });

        if (users.length < 4 || courses.length < 4) {
            console.log("⚠️ Not enough users or courses");
            return;
        }

        const enrollments = [
            // ===== محمد کریمی (users[0]) - ۵ دوره =====
            { user: users[0]._id, course: courses[0]._id, price: courses[0].price }, // Node.js
            { user: users[0]._id, course: courses[1]._id, price: courses[1].price }, // Python Django
            { user: users[0]._id, course: courses[3]._id, price: courses[3].price }, // Frontend
            { user: users[0]._id, course: courses[8]._id, price: courses[8].price }, // React/Next.js
            { user: users[0]._id, course: courses[7]._id, price: courses[7].price }, // DevOps

            // ===== زهرا احمدی (users[1]) - ۴ دوره =====
            { user: users[1]._id, course: courses[3]._id, price: courses[3].price }, // Frontend
            { user: users[1]._id, course: courses[8]._id, price: courses[8].price }, // React/Next.js
            { user: users[1]._id, course: courses[2]._id, price: courses[2].price }, // Kotlin
            { user: users[1]._id, course: courses[4]._id, price: courses[4].price }, // Security 1

            // ===== مریم قاسمی (users[2]) - ۳ دوره =====
            { user: users[2]._id, course: courses[0]._id, price: courses[0].price }, // Node.js
            { user: users[2]._id, course: courses[1]._id, price: courses[1].price }, // Python Django
            { user: users[2]._id, course: courses[9]._id, price: courses[9].price }, // Golang

            // ===== امیرحسین فلاح (users[3]) - ۴ دوره =====
            { user: users[3]._id, course: courses[4]._id, price: courses[4].price }, // Security 1
            { user: users[3]._id, course: courses[5]._id, price: courses[5].price }, // Security 2
            { user: users[3]._id, course: courses[6]._id, price: courses[6].price }, // Network
            { user: users[3]._id, course: courses[7]._id, price: courses[7].price }, // DevOps

            // ===== فاطمه موسوی (users[4]) - ۳ دوره =====
            { user: users[4]._id, course: courses[3]._id, price: courses[3].price }, // Frontend
            { user: users[4]._id, course: courses[8]._id, price: courses[8].price }, // React/Next.js
            { user: users[4]._id, course: courses[0]._id, price: courses[0].price }, // Node.js

            // ===== سینا رحیمی (users[5]) - ۳ دوره =====
            { user: users[5]._id, course: courses[6]._id, price: courses[6].price }, // Network
            { user: users[5]._id, course: courses[7]._id, price: courses[7].price }, // DevOps
            { user: users[5]._id, course: courses[9]._id, price: courses[9].price }, // Golang

            // ===== نرگس اکبری (users[6]) - ۲ دوره =====
            { user: users[6]._id, course: courses[2]._id, price: courses[2].price }, // Kotlin
            { user: users[6]._id, course: courses[8]._id, price: courses[8].price }, // React/Next.js

            // ===== کیانوش ملکی (users[7]) - ۳ دوره =====
            { user: users[7]._id, course: courses[1]._id, price: courses[1].price }, // Python Django
            { user: users[7]._id, course: courses[5]._id, price: courses[5].price }, // Security 2
            { user: users[7]._id, course: courses[9]._id, price: courses[9].price }, // Golang

            // ===== درسا محمدیان (users[8]) - ۲ دوره =====
            { user: users[8]._id, course: courses[3]._id, price: courses[3].price }, // Frontend
            { user: users[8]._id, course: courses[2]._id, price: courses[2].price }, // Kotlin

            // ===== آرش نیکنام (users[9]) - ۲ دوره =====
            { user: users[9]._id, course: courses[0]._id, price: courses[0].price }, // Node.js
            { user: users[9]._id, course: courses[5]._id, price: courses[5].price }, // Security 2

            // ===== محدثه صادقی (users[10]) - ۳ دوره =====
            { user: users[10]._id, course: courses[4]._id, price: courses[4].price }, // Security 1
            { user: users[10]._id, course: courses[7]._id, price: courses[7].price }, // DevOps
            { user: users[10]._id, course: courses[8]._id, price: courses[8].price }, // React/Next.js

            // ===== بهزاد کرمانشاهی (users[11]) - ۲ دوره =====
            { user: users[11]._id, course: courses[6]._id, price: courses[6].price }, // Network
            { user: users[11]._id, course: courses[5]._id, price: courses[5].price }, // Security 2
        ];

        // حذف تکراری‌ها
        const uniqueEnrollments = [];
        for (const enrollment of enrollments) {
            const exists = uniqueEnrollments.find(
                e => e.user.toString() === enrollment.user.toString() && 
                     e.course.toString() === enrollment.course.toString()
            );
            if (!exists) {
                uniqueEnrollments.push(enrollment);
            }
        }

        const created = await CourseUser.insertMany(uniqueEnrollments);
        console.log(`✅ ${created.length} course enrollments created`);

        for (const enrollment of created) {
            const user = users.find(u => u._id.toString() === enrollment.user.toString());
            const course = courses.find(c => c._id.toString() === enrollment.course.toString());
            console.log(`  ${user?.name} → ${course?.name}`);
        }

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

module.exports = seedCourseUsers;