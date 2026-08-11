const Comment = require("../models/Comment");
const User = require("../models/User");
const Course = require("../models/Course");

const seedComments = async () => {
    try {
        await Comment.deleteMany({});
        console.log("🧹 Old comments cleared");

        const users = await User.find({ roles: "USER" });
        const supportUser = await User.findOne({ roles: "SUPPORT" });
        const courses = await Course.find({ status: "published" });

        console.log(`Found ${users.length} users and ${courses.length} courses`);

        if (users.length < 4 || courses.length < 1) {
            console.log("⚠️ Not enough users or courses");
            return;
        }

        // تابع کمکی برای ساخت comment با reply
        const makeComment = (content, rating, userIndex, courseIndex, replyContent = null) => {
            const comment = {
                content,
                rating,
                user: users[userIndex]?._id,
                course: courses[courseIndex]?._id,
                replies: []
            };
            
            if (replyContent && supportUser) {
                comment.replies.push({
                    content: replyContent,
                    user: supportUser._id,
                    rating: 5
                });
            }
            
            return comment;
        };

        // فقط از کاربرهایی که وجود دارن استفاده کن
        const safe = (index) => Math.min(index, users.length - 1);

        const commentsData = [
            // Node.js (course[0])
            makeComment("دوره Node.js فوق‌العاده بود. از صفر شروع کردم و الان میتونم APIهای حرفه‌ای بسازم.", 5, safe(0), 0, "سلام محمد جان، خوشحالیم که دوره برات مفید بوده. 🙌"),
            makeComment("محتوای دوره خوب بود ولی سرعت تدریس یکم بالاست.", 3, safe(4), 0, "ممنون از بازخوردت. می‌تونی سرعت پخش رو کم کنی. ✅"),
            makeComment("بخش authentication خیلی گیج‌کننده بود. مثال‌های بیشتری نیاز داره.", 2, safe(5), 0, "توی آپدیت بعدی جلسات بیشتری اضافه می‌کنیم. 🙏"),
            makeComment("واقعاً عالی بود. فقط کاش جلسات WebSocket هم داشت.", 4, safe(2), 0),

            // Kotlin (course[1])
            makeComment("دوره کاتلین بهترین دوره‌ای بود که دیدم.", 5, safe(0), 1),
            makeComment("جاوا کار میکردم، کاتلین رو با این دوره یاد گرفتم.", 5, safe(6), 1, "خیلی خوشحالیم! موفق باشی! 🚀"),
            makeComment("کیفیت صدا توی بعضی جلسات افت داره.", 3, safe(5), 1, "چک می‌کنیم و دوباره ضبط می‌کنیم. 🎙️"),
            makeComment("قیمتش نسبت به محتوا یکم زیاده.", 2, safe(7), 1, "تخفیف‌های مناسبتی داریم. 😉"),

            // Frontend (course[2])
            makeComment("دوره فرانت‌اند مسیر شغلی منو عوض کرد.", 5, safe(1), 2),
            makeComment("بعد از این دوره توی یه شرکت خوب استخدام شدم.", 5, safe(2), 2, "تبریک میگم! 👏"),
            makeComment("بخش CSS عالی بود ولی JavaScript یکم پیچیده بود.", 3, safe(9), 2, "دوره مقدماتی JS به‌زودی میاد. 📚"),
            makeComment("پروژه‌هاش قدیمی شدن. کاش با React هم داشت.", 3, safe(3), 2),

            // Tailwind (course[3])
            makeComment("Tailwind CSS رو با این دوره خیلی سریع یاد گرفتم.", 5, safe(1), 3),
            makeComment("منتورینگ عالی بود. استاد واقعاً پیگیر بود.", 5, safe(4), 3, "خوشحالیم که مفید بوده. 💪"),
            makeComment("خوبه ولی خیلی کوتاهه. فقط ۱۶ جلسه است.", 3, safe(6), 3, "آپدیت جدید با ۸ جلسه اضافه میاد. 😊"),
            makeComment("صفر تا صدش رو یاد گرفتم ولی ای کاش پروژه بزرگ‌تری داشت.", 4, safe(10), 3),
            makeComment("حجم ویدیوها زیاده و دانلودشون سخته.", 2, safe(11), 3, "ویدیوها رو با کیفیت‌های مختلف آپلود می‌کنیم. 📹"),
        ];

        // فیلتر کامنت‌های بدون user یا course
        const validComments = commentsData.filter(c => c.user && c.course);

        const created = await Comment.insertMany(validComments);
        console.log(`✅ ${created.length} comments created`);

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

module.exports = seedComments;