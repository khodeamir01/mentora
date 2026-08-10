const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedUsers = async () => {
    try {
        await User.deleteMany({});
        console.log("🧹 Old users cleared");

        const password = await bcrypt.hash("12345678", 12);

        const users = [
            { name: "امیرسالار خرمایی", username: "amir_admin", email: "admin@mentora.com", password, roles: ["ADMIN"], bio: "بنیان‌گذار منتورا", avatar: "/img/avatar/defualtPic.png" },
            { name: "سارا محمدی", username: "sara_teacher", email: "sara@mentora.com", password, roles: ["TEACHER"], bio: "مدرس فرانت‌اند", avatar: "/img/avatar/defualtPic.png" },
            { name: "علی رضایی", username: "ali_teacher", email: "ali@mentora.com", password, roles: ["TEACHER"], bio: "برنامه‌نویس Node.js", avatar: "/img/avatar/defualtPic.png" },
            { name: "نگار حسینی", username: "negar_author", email: "negar@mentora.com", password, roles: ["AUTHOR"], bio: "نویسنده فنی", avatar: "/img/avatar/defualtPic.png" },
            { name: "محمد کریمی", username: "mohammad_user", email: "mohammad@mentora.com", password, roles: ["USER"], bio: "دانشجوی کامپیوتر", avatar: "/img/avatar/defualtPic.png" },
            { name: "زهرا احمدی", username: "zahra_user", email: "zahra@mentora.com", password, roles: ["USER"], bio: "طراح گرافیک", avatar: "/img/avatar/defualtPic.png" },
            { name: "رضا نوروزی", username: "reza_support", email: "reza@mentora.com", password, roles: ["SUPPORT"], bio: "پشتیبان فنی", avatar: "/img/avatar/defualtPic.png" },
            { name: "مریم قاسمی", username: "maryam_user", email: "maryam@mentora.com", password, roles: ["USER"], bio: "دانشجوی تازه‌کار", avatar: "/img/avatar/defualtPic.png" },
        ];

        await User.insertMany(users);
        console.log("✅ Users created");

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

module.exports = seedUsers;
