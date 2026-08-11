const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedUsers = async () => {
    try {
        await User.deleteMany({});
        console.log("🧹 Old users cleared");

        const password = await bcrypt.hash("12345678", 12);

        const users = [
            { name: "امیرسالار خرمایی", username: "amir_admin", email: "admin@mentora.com", password, roles: ["ADMIN"], bio: "بنیان‌گذار منتورا", avatar: "/img/seeders/Amir-Admin.jpg" },
            { name: "سارا محمدی", username: "sara_teacher", email: "sara@mentora.com", password, roles: ["TEACHER"], bio: "مدرس فرانت‌اند", avatar: "/img/team/team1.jpg" },
            { name: "علی رضایی", username: "ali_teacher", email: "ali@mentora.com", password, roles: ["TEACHER"], bio: "برنامه‌نویس Node.js", avatar: "/img/team/team2.jpg"},
            { name: "نگار حسینی", username: "negar_author", email: "negar@mentora.com", password, roles: ["AUTHOR"], bio: "نویسنده فنی", avatar: "/img/team/team3.jpg" },
            { name: "محمد کریمی", username: "mohammad_user", email: "mohammad@mentora.com", password, roles: ["USER"], bio: "دانشجوی کامپیوتر", avatar: "/img/testimonial/3.png" },
            { name: "زهرا احمدی", username: "zahra_user", email: "zahra@mentora.com", password, roles: ["USER"], bio: "طراح گرافیک", avatar: "/img/testimonial/2.png" },
            { name: "رضا نوروزی", username: "reza_support", email: "reza@mentora.com", password, roles: ["SUPPORT"], bio: "پشتیبان فنی", avatar: "/img/team/team4.jpg" },
            { name: "مریم قاسمی", username: "maryam_user", email: "maryam@mentora.com", password, roles: ["USER"], bio: "دانشجوی تازه‌کار", avatar: "/img/testimonial/1.png" },
            { name: "امیرحسین فلاح", username: "amir_user", email: "amir@mentora.com", password, roles: ["USER"], bio: "دانشجوی مهندسی نرم‌افزار، علاقه‌مند به هوش مصنوعی", avatar: "/img/blog/c3.jpg" },
            { name: "فاطمه موسوی", username: "fatemeh_user", email: "fatemeh@mentora.com", password, roles: ["USER"], bio: "کارمند بانک، در حال تغییر شغل به برنامه‌نویسی", avatar: "/img/testimonial/4.png" },
            { name: "سینا رحیمی", username: "sina_user", email: "sina@mentora.com", password, roles: ["USER"], bio: "فریلنسر و علاقه‌مند به تکنولوژی‌های جدید", avatar: "/img/blog/author.jpg" },
            { name: "نرگس اکبری", username: "narges_user", email: "narges@mentora.com", password, roles: ["USER"], bio: "دانشجوی رشته IT، عاشق طراحی وب", avatar: "/img/testimonial/5.png" },
            { name: "کیانوش ملکی", username: "kianoosh_user", email: "kianoosh@mentora.com", password, roles: ["USER"], bio: "برنامه‌نویس خودآموخته، دنبال یادگیری حرفه‌ای", avatar: "/img/blog/2.jpg" },
            { name: "درسا محمدیان", username: "dorsa_user", email: "dorsa@mentora.com", password, roles: ["USER"], bio: "دانش‌آموز دبیرستانی، شروع یادگیری کدنویسی", avatar: "/img/blog/c1.jpg" },
            { name: "آرش نیکنام", username: "arash_user", email: "arash@mentora.com", password, roles: ["USER"], bio: "مهندس برق، علاقه‌مند به برنامه‌نویسی بک‌اند", avatar: "/img/client04.png" },
            { name: "مهران فرهادی", username: "mehran_teacher", email: "mehran@mentora.com", password, roles: ["TEACHER"], bio: "متخصص امنیت شبکه و وب با ۱۰ سال تجربه", avatar: "/img/team/security.jpg" },
            { name: "شیما کرمانی", username: "shima_teacher", email: "shima@mentora.com", password, roles: ["TEACHER"], bio: "کارشناس شبکه‌های کامپیوتری و زیرساخت", avatar: "/img/team/network.jpg"}
        ];

        await User.insertMany(users);
        console.log("✅ Users created");

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

module.exports = seedUsers;
