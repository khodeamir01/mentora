// seeders/userSeeder.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedUsers = async () => {
    try {
        await User.deleteMany({});
        console.log("🧹 Old users cleared");

        const password = await bcrypt.hash("12345678", 12);
        const avatar =  "/img/avatar/defualtPic.png"


        const users = [
            { name: "امیرسالار خرمایی", username: "amir_admin", email: "admin@mentora.com", password, roles: ["ADMIN"], bio: "بنیان‌گذار منتورا", avatar: "/img/seeders/Amir-Admin" || avatar },
            { name: "سارا محمدی", username: "sara_teacher", email: "sara@mentora.com", password, roles: ["TEACHER"], bio: "مدرس فرانت‌اند", avatar: "/img/seeders/teacher4" || avatar },
            { name: "علی رضایی", username: "ali_teacher", email: "ali@mentora.com", password, roles: ["TEACHER"], bio: "برنامه‌نویس Node.js", avatar: "/img/seeders/teacher2" || avatar },
            { name: "نگار حسینی", username: "negar_author", email: "negar@mentora.com", password, roles: ["AUTHOR"], bio: "نویسنده فنی", avatar: "/img/seeders/author1" || avatar },
            { name: "محمد کریمی", username: "mohammad_user", email: "mohammad@mentora.com", password, roles: ["USER"], bio: "دانشجوی کامپیوتر", avatar: avatar },
            { name: "زهرا احمدی", username: "zahra_user", email: "zahra@mentora.com", password, roles: ["USER"], bio: "طراح گرافیک", avatar: avatar },
            { name: "رضا نوروزی", username: "reza_support", email: "reza@mentora.com", password, roles: ["SUPPORT"], bio: "پشتیبان فنی", avatar: "/img/seeders/support1" || avatar },
            { name: "مریم قاسمی", username: "maryam_user", email: "maryam@mentora.com", password, roles: ["USER"], bio: "دانشجوی تازه‌کار", avatar: avatar },
        ];

        const created = await User.insertMany(users);
        console.log(`✅ ${created.length} users created`);
        created.forEach(u => console.log(`  ${u.name} (@${u.username}) - [${u.roles.join(", ")}]`));
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mentora").then(seedUsers);