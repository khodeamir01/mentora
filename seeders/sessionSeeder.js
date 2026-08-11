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

        // ==================== Node.js ====================
        if (courseMap["آموزش جامع Node.js"]) {
            const teacher = courseMap["آموزش جامع Node.js"].teacher;
            sessions.push(
                { title: "معرفی Node.js و نصب", order: 1, isFree: true, course: courseMap["آموزش جامع Node.js"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "Express.js و Routing", order: 2, isFree: false, course: courseMap["آموزش جامع Node.js"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "Middlewares", order: 3, isFree: true, course: courseMap["آموزش جامع Node.js"]._id, creator: teacher._id, video: "test3.mp4" },
                { title: "MongoDB و Mongoose", order: 4, isFree: false, course: courseMap["آموزش جامع Node.js"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "احراز هویت با JWT", order: 5, isFree: false, course: courseMap["آموزش جامع Node.js"]._id, creator: teacher._id, video: "test2.mp4" }
            );
        }

        // ==================== Python Django ====================
        if (courseMap["آموزش Python و Django"]) {
            const teacher = courseMap["آموزش Python و Django"].teacher;
            sessions.push(
                { title: "معرفی Python و Django", order: 1, isFree: true, course: courseMap["آموزش Python و Django"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "مدل‌ها و ORM", order: 2, isFree: false, course: courseMap["آموزش Python و Django"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "REST API با Django", order: 3, isFree: false, course: courseMap["آموزش Python و Django"]._id, creator: teacher._id, video: "test3.mp4" },
                { title: "Celery و Redis", order: 4, isFree: false, course: courseMap["آموزش Python و Django"]._id, creator: teacher._id, video: "test1.mp4" }
            );
        }

        // ==================== Kotlin ====================
        if (courseMap["دوره توسعه اندروید با کاتلین"]) {
            const teacher = courseMap["دوره توسعه اندروید با کاتلین"].teacher;
            sessions.push(
                { title: "معرفی کاتلین و Android Studio", order: 1, isFree: true, course: courseMap["دوره توسعه اندروید با کاتلین"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "Layout و UI", order: 2, isFree: true, course: courseMap["دوره توسعه اندروید با کاتلین"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "RecyclerView", order: 3, isFree: false, course: courseMap["دوره توسعه اندروید با کاتلین"]._id, creator: teacher._id, video: "test3.mp4" },
                { title: "Retrofit و API", order: 4, isFree: false, course: courseMap["دوره توسعه اندروید با کاتلین"]._id, creator: teacher._id, video: "test1.mp4" }
            );
        }

        // ==================== Frontend ====================
        if (courseMap["دوره آموزش فرانت‌اند"]) {
            const teacher = courseMap["دوره آموزش فرانت‌اند"].teacher;
            sessions.push(
                { title: "HTML5 Semantic", order: 1, isFree: true, course: courseMap["دوره آموزش فرانت‌اند"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "CSS3 و Flexbox", order: 2, isFree: false, course: courseMap["دوره آموزش فرانت‌اند"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "مبانی جاوا اسکریپت", order: 3, isFree: true, course: courseMap["دوره آموزش فرانت‌اند"]._id, creator: teacher._id, video: "test3.mp4" },
                { title: "DOM و Events", order: 4, isFree: false, course: courseMap["دوره آموزش فرانت‌اند"]._id, creator: teacher._id, video: "test1.mp4" }
            );
        }

        // ==================== Security 1 ====================
        if (courseMap["دوره جامع امنیت شبکه و وب"]) {
            const teacher = courseMap["دوره جامع امنیت شبکه و وب"].teacher;
            sessions.push(
                { title: "مفاهیم پایه امنیت", order: 1, isFree: true, course: courseMap["دوره جامع امنیت شبکه و وب"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "OWASP Top 10", order: 2, isFree: true, course: courseMap["دوره جامع امنیت شبکه و وب"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "SQL Injection و XSS", order: 3, isFree: false, course: courseMap["دوره جامع امنیت شبکه و وب"]._id, creator: teacher._id, video: "test3.mp4" },
                { title: "تست نفوذ با Burp Suite", order: 4, isFree: false, course: courseMap["دوره جامع امنیت شبکه و وب"]._id, creator: teacher._id, video: "test1.mp4" }
            );
        }

        // ==================== Security 2 ====================
        if (courseMap["دوره امنیت سایبری و هک اخلاقی"]) {
            const teacher = courseMap["دوره امنیت سایبری و هک اخلاقی"].teacher;
            sessions.push(
                { title: "معرفی Kali Linux", order: 1, isFree: true, course: courseMap["دوره امنیت سایبری و هک اخلاقی"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "Metasploit Framework", order: 2, isFree: true, course: courseMap["دوره امنیت سایبری و هک اخلاقی"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "تست نفوذ پیشرفته", order: 3, isFree: false, course: courseMap["دوره امنیت سایبری و هک اخلاقی"]._id, creator: teacher._id, video: "test3.mp4" },
                { title: "گزارش‌نویسی و مستندسازی", order: 4, isFree: false, course: courseMap["دوره امنیت سایبری و هک اخلاقی"]._id, creator: teacher._id, video: "test1.mp4" }
            );
        }

        // ==================== Network ====================
        if (courseMap["دوره شبکه‌های کامپیوتری و زیرساخت"]) {
            const teacher = courseMap["دوره شبکه‌های کامپیوتری و زیرساخت"].teacher;
            sessions.push(
                { title: "مدل OSI و TCP/IP", order: 1, isFree: true, course: courseMap["دوره شبکه‌های کامپیوتری و زیرساخت"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "Subnetting و IP", order: 2, isFree: true, course: courseMap["دوره شبکه‌های کامپیوتری و زیرساخت"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "Routing و Switching", order: 3, isFree: false, course: courseMap["دوره شبکه‌های کامپیوتری و زیرساخت"]._id, creator: teacher._id, video: "test3.mp4" },
                { title: "پیکربندی سیسکو", order: 4, isFree: false, course: courseMap["دوره شبکه‌های کامپیوتری و زیرساخت"]._id, creator: teacher._id, video: "test1.mp4" }
            );
        }

        // ==================== DevOps ====================
        if (courseMap["دوره DevOps و Cloud"]) {
            const teacher = courseMap["دوره DevOps و Cloud"].teacher;
            sessions.push(
                { title: "Docker و Containerization", order: 1, isFree: true, course: courseMap["دوره DevOps و Cloud"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "Kubernetes و Orchestration", order: 2, isFree: true, course: courseMap["دوره DevOps و Cloud"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "CI/CD با GitHub Actions", order: 3, isFree: false, course: courseMap["دوره DevOps و Cloud"]._id, creator: teacher._id, video: "test3.mp4" },
                { title: "AWS و Cloud Deployment", order: 4, isFree: false, course: courseMap["دوره DevOps و Cloud"]._id, creator: teacher._id, video: "test1.mp4" }
            );
        }

        // ==================== React/Next.js ====================
        if (courseMap["دوره React و Next.js"]) {
            const teacher = courseMap["دوره React و Next.js"].teacher;
            sessions.push(
                { title: "معرفی React و ایجاد پروژه", order: 1, isFree: true, course: courseMap["دوره React و Next.js"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "Hooks و State", order: 2, isFree: true, course: courseMap["دوره React و Next.js"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "Next.js و SSR", order: 3, isFree: false, course: courseMap["دوره React و Next.js"]._id, creator: teacher._id, video: "test3.mp4" },
                { title: "پروژه نهایی", order: 4, isFree: false, course: courseMap["دوره React و Next.js"]._id, creator: teacher._id, video: "test1.mp4" }
            );
        }

        // ==================== Golang ====================
        if (courseMap["دوره Golang و میکروسرویس‌ها"]) {
            const teacher = courseMap["دوره Golang و میکروسرویس‌ها"].teacher;
            sessions.push(
                { title: "معرفی Go و نصب", order: 1, isFree: true, course: courseMap["دوره Golang و میکروسرویس‌ها"]._id, creator: teacher._id, video: "test1.mp4" },
                { title: "Goroutines و Concurrency", order: 2, isFree: true, course: courseMap["دوره Golang و میکروسرویس‌ها"]._id, creator: teacher._id, video: "test2.mp4" },
                { title: "gRPC و Microservices", order: 3, isFree: false, course: courseMap["دوره Golang و میکروسرویس‌ها"]._id, creator: teacher._id, video: "test3.mp4" },
                { title: "Docker و Deployment", order: 4, isFree: false, course: courseMap["دوره Golang و میکروسرویس‌ها"]._id, creator: teacher._id, video: "test1.mp4" }
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