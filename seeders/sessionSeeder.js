const Session = require("../models/Session");
const Course = require("../models/Course");
const User = require("../models/User");

const seedSessions = async () => {
    try {
        await Session.deleteMany({});
        console.log("🧹 Old sessions cleared");

        const teacher = await User.findOne({ roles: "TEACHER" });
        const courses = await Course.find({});
        
        console.log("Courses found:", courses.map(c => c.name));
        
        const courseMap = {};
        courses.forEach(c => { courseMap[c.name] = c._id; });

        const sessions = [];

        if (courseMap["آموزش جامع Node.js"]) {
            sessions.push(
                { title: "معرفی Node.js و نصب", order: 1, isFree: true, course: courseMap["آموزش جامع Node.js"], creator: teacher._id, video: "/img/session/nodejs-1.mp4" },
                { title: "Express.js و Routing", order: 2, isFree: false, course: courseMap["آموزش جامع Node.js"], creator: teacher._id, video: "/img/session/nodejs-2.mp4" }
            );
        }

        if (courseMap["دوره توسعه اندروید با کاتلین"]) {
            sessions.push(
                { title: "معرفی کاتلین", order: 1, isFree: true, course: courseMap["دوره توسعه اندروید با کاتلین"], creator: teacher._id, video: "/img/session/kotlin-1.mp4" }
            );
        }

        if (courseMap["دوره آموزش فرانت‌اند"]) {
            sessions.push(
                { title: "HTML5 Semantic", order: 1, isFree: true, course: courseMap["دوره آموزش فرانت‌اند"], creator: teacher._id, video: "/img/session/frontend-1.mp4" }
            );
        }

        if (courseMap["آموزش Tailwind CSS"]) {
            sessions.push(
                { title: "نصب و راه‌اندازی Tailwind", order: 1, isFree: true, course: courseMap["آموزش Tailwind CSS"], creator: teacher._id, video: "/img/session/tailwind-1.mp4" }
            );
        }

        if (sessions.length > 0) {
            await Session.insertMany(sessions);
            console.log(`✅ ${sessions.length} sessions created`);
        } else {
            console.log("⚠️ No sessions created - courses not found");
        }

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

module.exports = seedSessions;
