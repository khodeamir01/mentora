// seeders/userSeeder.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedUsers = async () => {
    try {


        const password = await bcrypt.hash("123456", 12);

        const users = [
            { name: "سارا محمدی", username: "sara_teacher", email: "sara@eduleb.com", password, roles: ["TEACHER"], bio: "مدرس فرانت‌اند با ۶ سال تجربه در React و Vue", avatar: "/img/avatar/sara.jpg" },
            { name: "علی رضایی", username: "ali_teacher", email: "ali@eduleb.com", password, roles: ["TEACHER"], bio: "برنامه‌نویس بک‌اند با تخصص در Node.js و پایگاه داده", avatar: "/img/avatar/ali.jpg" },
            { name: "نگار حسینی", username: "negar_author", email: "negar@eduleb.com", password, roles: ["AUTHOR"], bio: "نویسنده فنی و علاقه‌مند به تکنولوژی‌های وب", avatar: "/img/avatar/negar.jpg" },
            { name: "محمد کریمی", username: "mohammad_user", email: "mohammad@eduleb.com", password, roles: ["USER"], bio: "دانشجوی کامپیوتر، در حال یادگیری React", avatar: "/img/avatar/mohammad.jpg" },
            { name: "زهرا احمدی", username: "zahra_user", email: "zahra@eduleb.com", password, roles: ["USER"], bio: "طراح گرافیک، عاشق یادگیری UI/UX", avatar: "/img/avatar/zahra.jpg" },
            { name: "رضا نوروزی", username: "reza_user", email: "reza@eduleb.com", password, roles: ["USER", "AUTHOR"], bio: "توسعه‌دهنده موبایل و نویسنده مقالات فنی", avatar: "/img/avatar/reza.jpg" },
            { name: "مریم قاسمی", username: "maryam_user", email: "maryam@eduleb.com", password, roles: ["USER"], bio: "تازه‌کار ولی پرانگیزه برای یادگیری برنامه‌نویسی", avatar: "/img/avatar/maryam.jpg" },
            { name: "حسین طاهری", username: "hossein_teacher", email: "hossein@eduleb.com", password, roles: ["TEACHER", "AUTHOR"], bio: "مدرس DevOps و نویسنده مقالات CI/CD", avatar: "/img/avatar/hossein.jpg" },
            { name: "الناز شکری", username: "elnaz_user", email: "elnaz@eduleb.com", password, roles: ["USER"], bio: "دانشجوی رشته نرم‌افزار، علاقه‌مند به هوش مصنوعی", avatar: "/img/avatar/elnaz.jpg" },
        ];

        const createdUsers = await User.insertMany(users);
        console.log(`✅ ${createdUsers.length} users created`);

        createdUsers.forEach((u, i) => {
            console.log(`  ${i + 1}. ${u.name} (@${u.username}) - [${u.roles.join(", ")}]`);
        });

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/eduleb")
    .then(() => { console.log("🔗 Connected"); return seedUsers(); })
    .then(() => { console.log("✨ Done"); process.exit(0); })
    .catch(err => { console.error("💥 Error:", err); process.exit(1); });