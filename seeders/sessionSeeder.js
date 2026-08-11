const Session = require("../models/Session");
const Course = require("../models/Course");

const seedSessions = async () => {
    try {
        await Session.deleteMany({});
        console.log("🧹 Old sessions cleared");

        const courses = await Course.find({}).populate("teacher", "name avatar _id");
        
        console.log("Courses found:", courses.map(c => `${c.name} (Teacher: ${c.teacher?.name})`));
        
        const courseMap = {};
        courses.forEach(c => { courseMap[c.name] = c; }); 

        const sessions = [];

        if (courseMap["آموزش جامع Node.js"]) {
            const teacher = courseMap["آموزش جامع Node.js"].teacher;
            sessions.push(
                { title: "معرفی Node.js و نصب", order: 1, isFree: true, course: courseMap["آموزش جامع Node.js"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "Express.js و Routing", order: 2, isFree: false, course: courseMap["آموزش جامع Node.js"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "Middlewares", order: 3, isFree: true, course: courseMap["آموزش جامع Node.js"]._id, creator: teacher._id, video: "test3.mp4" }
            );
        }

        if (courseMap["دوره توسعه اندروید با کاتلین"]) {
            const teacher = courseMap["دوره توسعه اندروید با کاتلین"].teacher;
            sessions.push(
                { title: "معرفی کاتلین", order: 1, isFree: true, course: courseMap["دوره توسعه اندروید با کاتلین"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "Functions", order: 2, isFree: false, course: courseMap["دوره توسعه اندروید با کاتلین"]._id, creator: teacher._id, video: "test2.mp4" }
            );
        }

        if (courseMap["دوره آموزش فرانت‌اند"]) {
            const teacher = courseMap["دوره آموزش فرانت‌اند"].teacher;
            sessions.push(
                { title: "HTML5 Semantic", order: 1, isFree: true, course: courseMap["دوره آموزش فرانت‌اند"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "مبانی جاوا اسکریپت", order: 2, isFree: false, course: courseMap["دوره آموزش فرانت‌اند"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "آموزش Next.js", order: 3, isFree: true, course: courseMap["دوره آموزش فرانت‌اند"]._id, creator: teacher._id, video: "test3.mp4" }
            );
        }

        if (courseMap["آموزش Tailwind CSS"]) {
            const teacher = courseMap["آموزش Tailwind CSS"].teacher;
            sessions.push(
                { title: "نصب و راه‌اندازی Tailwind", order: 1, isFree: true, course: courseMap["آموزش Tailwind CSS"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "آپدیت 2026", order: 2, isFree: false, course: courseMap["آموزش Tailwind CSS"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "سخن پایانی", order: 3, isFree: true, course: courseMap["آموزش Tailwind CSS"]._id, creator: teacher._id, video: "test3.mp4" }
            );
        }

        if (courseMap["دوره جامع امنیت شبکه و وب"]) {
            const teacher = courseMap["دوره جامع امنیت شبکه و وب"].teacher;
            sessions.push(
                { title: "مفاهیم پایه امنیت", order: 1, isFree: true, course: courseMap["دوره جامع امنیت شبکه و وب"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "OWASP Top 10", order: 2, isFree: true, course: courseMap["دوره جامع امنیت شبکه و وب"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "SQL Injection و XSS", order: 3, isFree: false, course: courseMap["دوره جامع امنیت شبکه و وب"]._id, creator: teacher._id, video: "test3.mp4" },
                { title: "تست نفوذ", order: 4, isFree: false, course: courseMap["دوره جامع امنیت شبکه و وب"]._id, creator: teacher._id, video: "test1.mp4" }
            );
        }

        if (courseMap["دوره شبکه‌های کامپیوتری و زیرساخت"]) {
            const teacher = courseMap["دوره شبکه‌های کامپیوتری و زیرساخت"].teacher;
            sessions.push(
                { title: "مدل OSI و TCP/IP", order: 1, isFree: true, course: courseMap["دوره شبکه‌های کامپیوتری و زیرساخت"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "Subnetting", order: 2, isFree: true, course: courseMap["دوره شبکه‌های کامپیوتری و زیرساخت"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "Routing", order: 3, isFree: false, course: courseMap["دوره شبکه‌های کامپیوتری و زیرساخت"]._id, creator: teacher._id, video: "test3.mp4" }
            );
        }

        if (sessions.length > 0) {
            await Session.insertMany(sessions);
            console.log(`✅ ${sessions.length} sessions created`);
        }

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

module.exports = seedSessions;
