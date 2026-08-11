const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedUsers = async () => {
    try {
        await User.deleteMany({});
        console.log("🧹 Old users cleared");

        const password = await bcrypt.hash("12345678", 12);


        const users = [
            { name: "امیرسالار خرمایی", username: "amir_admin", email: "admin@mentora.com", password, roles: ["ADMIN"], bio: "بنیان‌گذار منتورا، عاشق کدنویسی و معماری نرم‌افزار", avatar: "/img/seeders/Amir-Admin.jpg" },
            
            { name: "سارا محمدی", username: "sara_teacher", email: "sara@mentora.com", password, roles: ["TEACHER"], bio: "مدرس فرانت‌اند با ۶ سال تجربه در React و Vue", avatar: "/img/team/team1.jpg" },
            { name: "علی رضایی", username: "ali_teacher", email: "ali@mentora.com", password, roles: ["TEACHER"], bio: "متخصص Node.js و معماری بک‌اند", avatar: "/img/team/team2.jpg" },
            { name: "بابک شریفی", username: "babak_teacher", email: "babak@mentora.com", password, roles: ["TEACHER"], bio: "برنامه‌نویس پایتون و Django", avatar: "/img/team/team4.jpg"},
            { name: "حسین طاهری", username: "hossein_teacher", email: "hossein@mentora.com", password, roles: ["TEACHER"], bio: "توسعه‌دهنده اندروید و کاتلین", avatar: "/img/blog/c3.jpg" },
            { name: "مهران فرهادی", username: "mehran_teacher", email: "mehran@mentora.com", password, roles: ["TEACHER"], bio: "متخصص امنیت شبکه و وب", avatar: "/img/blog/2.jpg"  },
            { name: "ترانه امینی", username: "taraneh_teacher", email: "taraneh@mentora.com", password, roles: ["TEACHER"], bio: "کارشناس امنیت سایبری و هک اخلاقی", avatar: "/img/team/team3.jpg"},
            { name: "شیما کرمانی", username: "shima_teacher", email: "shima@mentora.com", password, roles: ["TEACHER"], bio: "کارشناس شبکه‌های کامپیوتری و زیرساخت", avatar: "/img/team/network.jpg" },
            { name: "پدرام نادری", username: "pedram_teacher", email: "pedram@mentora.com", password, roles: ["TEACHER"], bio: "مهندس DevOps و Cloud", avatar: "/img/client04.png" },
            { name: "نرگس رحیمی", username: "narges_teacher", email: "narges_t@mentora.com", password, roles: ["TEACHER"], bio: "مدرس React و Next.js با ۵ سال تجربه", avatar: "/img/team/narges.jpg" },
            { name: "کامران صدیقی", username: "kamran_teacher", email: "kamran@mentora.com", password, roles: ["TEACHER"], bio: "متخصص Go و میکروسرویس‌ها", avatar: "/img/team/kamran.jpg" },
            
            { name: "نگار حسینی", username: "negar_author", email: "negar@mentora.com", password, roles: ["AUTHOR"], bio: "نویسنده فنی و علاقه‌مند به تکنولوژی‌های وب", avatar: "/img/team/negar.jpg" },
            { name: "رضا نوروزی", username: "reza_author", email: "reza_author@mentora.com", password, roles: ["AUTHOR"], bio: "توسعه‌دهنده موبایل و نویسنده مقالات فنی", avatar: "/img/team/reza.jpg" },
            
            { name: "الناز شکری", username: "elnaz_support", email: "elnaz@mentora.com", password, roles: ["SUPPORT"], bio: "پشتیبان فنی و پاسخگوی تیکت‌ها", avatar: "/img/team/elnaz.jpg" },
            { name: "پویا احمدی", username: "pouya_support", email: "pouya@mentora.com", password, roles: ["SUPPORT"], bio: "کارشناس پشتیبانی و راهنمایی دانشجویان", avatar: "/img/blog/author.jpg" },
            
            { name: "محمد کریمی", username: "mohammad_user", email: "mohammad@mentora.com", password, roles: ["USER"], bio: "دانشجوی کامپیوتر، در حال یادگیری React", avatar: "/img/team/mohammad.jpg" },
            { name: "زهرا احمدی", username: "zahra_user", email: "zahra@mentora.com", password, roles: ["USER"], bio: "طراح گرافیک، عاشق یادگیری UI/UX", avatar: "/img/team/zahra.jpg" },
            { name: "مریم قاسمی", username: "maryam_user", email: "maryam@mentora.com", password, roles: ["USER"], bio: "تازه‌کار ولی پرانگیزه برای یادگیری برنامه‌نویسی", avatar: "/img/team/maryam.jpg"},
            { name: "امیرحسین فلاح", username: "amir_user", email: "amir@mentora.com", password, roles: ["USER"], bio: "دانشجوی مهندسی نرم‌افزار، علاقه‌مند به هوش مصنوعی", avatar: "/img/team/amir.jpg" },
            { name: "فاطمه موسوی", username: "fatemeh_user", email: "fatemeh@mentora.com", password, roles: ["USER"], bio: "کارمند بانک، در حال تغییر شغل به برنامه‌نویسی", avatar: "/img/team/fatemeh.jpg" },
            { name: "سینا رحیمی", username: "sina_user", email: "sina@mentora.com", password, roles: ["USER"], bio: "فریلنسر و علاقه‌مند به تکنولوژی‌های جدید", avatar: "/img/team/sina.jpg" },
            { name: "نرگس اکبری", username: "atena", email: "atena@mentora.com", password, roles: ["USER"], bio: "دانشجوی رشته IT، عاشق طراحی وب", avatar: "/img/team/atena.jpg" },
            { name: "کیانوش ملکی", username: "soleiman_user", email: "soleiman@mentora.com", password, roles: ["USER"], bio: "برنامه‌نویس خودآموخته، دنبال یادگیری حرفه‌ای", avatar: "/img/team/soleiman.jpg" },
            { name: "درسا محمدیان", username: "leyli_user", email: "leyli@mentora.com", password, roles: ["USER"], bio: "دانش‌آموز دبیرستانی، شروع یادگیری کدنویسی", avatar: "/img/team/leyli.jpg" },
            { name: "آرش نیکنام", username: "nader_user", email: "nader@mentora.com", password, roles: ["USER"], bio: "مهندس برق، علاقه‌مند به برنامه‌نویسی بک‌اند", avatar: "/img/team/nader.jpg" },
            { name: "محدثه صادقی", username: "mohadeseh_user", email: "mohadeseh@mentora.com", password, roles: ["USER"], bio: "فارغ‌التحصیل کامپیوتر، آماده ورود به بازار کار", avatar: "/img/avatar/defualtPic.png" },
            { name: "بهزاد کرمانشاهی", username: "behzad_user", email: "behzad@mentora.com", password, roles: ["USER"], bio: "علاقه‌مند به لینوکس و امنیت", avatar: "/img/avatar/defualtPic.png" },
        ];

        await User.insertMany(users);
        console.log("✅ Users created");

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

module.exports = seedUsers;
