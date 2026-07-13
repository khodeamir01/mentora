// seeders/commentSeeder.js
const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const User = require("../models/User");
const Course = require("../models/Course");

const seedComments = async () => {
    try {
        // Clear old comments
        await Comment.deleteMany({});
        console.log("🧹 Old comments cleared");

        // Find users with USER role
        const users = await User.find({ roles: "USER" }).limit(3);
        if (users.length === 0) {
            console.log("❌ No USER found");
            return;
        }

        // Find published courses
        const courses = await Course.find({}).limit(3);
        if (courses.length === 0) {
            console.log("❌ No published courses found");
            return;
        }

        const commentsData = [
            {
                content: "دوره تیلویند فوق‌العاده بود...",
                rating: 5,
                user: users[0]._id,
                course: courses[0]._id
            },
            {
                content: "دوره تیلویند فوق‌العاده بود. از صفر شروع کردم و الان میتونم هر طرحی رو توی کمترین زمان پیاده کنم. سرعت کارم چند برابر شده و دیگه از CSS خسته نمیشم!",
                rating: 5,
                user: users[0]._id,
                course: courses[0]._id
            },
            {
                content: "دوره Node.js بهترین سرمایه‌گذاری عمرم بود. مباحث async/await و middleware رو خیلی خوب توضیح داد. الان یه API کامل با JWT و MongoDB میسازم و کلی پروژه فریلنسری گرفتم.",
                rating: 5,
                user: users[1]._id,
                course: courses[1]._id
            },
            {
                content: "بوت‌کمپ فرانت‌اند مسیر شغلی منو کاملاً عوض کرد. از HTML و CSS تا React و Next.js رو پروژه‌محور یاد گرفتم. الان توی یه شرکت معتبر با حقوق عالی استخدام شدم. واقعاً ممنونم!",
                rating: 5,
                user: users[2]._id,
                course: courses[2]._id
            },
            {
                content: "واقعاً دوره خوبی بود. خیلی از چیزایی که توی دانشگاه یاد نگرفتم رو اینجا توی دو هفته یاد گرفتم. پشتیبانی هم عالی بود.",
                rating: 4,
                user: users[0]._id,
                course: courses[1]._id
            },
            {
                content: "محتوای دوره کاملاً به‌روز و کاربردی بود. پروژه‌های دوره دقیقاً چیزایی بودن که توی مصاحبه‌های استخدامی میپرسن.",
                rating: 5,
                user: users[1]._id,
                course: courses[0]._id
            },
            {
                content: "من قبلاً چندین دوره دیده بودم ولی هیچکدوم به اندازه این دوره مفید نبود. مدرس خیلی مسلط بود و سوالات رو سریع جواب میداد.",
                rating: 5,
                user: users[2]._id,
                course: courses[1]._id
            },
            {
                content: "یه ماهه دارم ازش استفاده میکنم، واقعاً راضیم. فقط کاش جلسات بیشتری داشت. منتظر دوره‌های جدید هستم.",
                rating: 4,
                user: users[0]._id,
                course: courses[2]._id
            }
            // ... بقیه کامنت‌ها
        ];

        const comments = await Comment.insertMany(commentsData);
        console.log(`✅ ${comments.length} comments created successfully`);
        
        comments.forEach((c, i) => {
            console.log(`  ${i + 1}. Rating: ${c.rating}⭐ | ${c.content.substring(0, 50)}...`);
        });

    } catch (error) {
        console.error("❌ Error seeding comments:", error);
    }
};

// Connect & Run
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Mentora")
    .then(() => {
        console.log("🔗 Connected to database");
        return seedComments();
    })
    .then(() => {
        console.log("✨ Done");
        process.exit(0);
    })
    .catch(err => {
        console.error("💥 Error:", err);
        process.exit(1);
    });