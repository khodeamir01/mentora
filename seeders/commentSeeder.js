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

        const makeComment = (content, rating, userIndex, courseIndex, replyContent = null) => {
            const comment = {
                content,
                rating,
                user: users[userIndex]?._id,
                course: courses[courseIndex]?._id,
                replies: []
            };
            if (replyContent && supportUser) {
                comment.replies.push({ content: replyContent, user: supportUser._id, rating: 5 });
            }
            return comment;
        };

        const safe = (index) => Math.min(index, users.length - 1);

        const commentsData = [
            // ==================== Node.js (course[0]) ====================
            makeComment("دوره Node.js فوق‌العاده بود. از صفر شروع کردم و الان میتونم APIهای حرفه‌ای بسازم. ممنون از مدرس عزیز.", 5, safe(0), 0, "سلام محمد جان، خوشحالیم که دوره برات مفید بوده. 🙌"),
            makeComment("محتوای دوره خوب بود ولی سرعت تدریس یکم بالاست. اگه آروم‌تر توضیح میدادن بهتر بود.", 3, safe(3), 0, "ممنون از بازخوردت امیرحسین جان. می‌تونی سرعت پخش ویدیو رو کم کنی. ✅"),
            makeComment("بخش authentication خیلی گیج‌کننده بود. مثال‌های بیشتری نیاز داره.", 2, safe(9), 0, "سلام آرش جان، توی آپدیت بعدی جلسات بیشتری برای JWT اضافه می‌کنیم. 🙏"),
            makeComment("پروژه فروشگاهی آخر دوره عالی بود. کلی چیز یاد گرفتم.", 4, safe(2), 0),

            // ==================== Python Django (course[1]) ====================
            makeComment("Django واقعاً قدرتمنده. ممنون از دوره خوبتون. پروژه‌ها خیلی کاربردی بودن.", 5, safe(6), 1),
            makeComment("بخش Celery یکم پیچیده بود. مثال بیشتری می‌خواست.", 2, safe(4), 1, "چشم، حتماً توی آپدیت اضافه می‌کنیم. 📚"),
            makeComment("بهترین دوره پایتونی که دیدم. از صفر تا ساخت API کامل رو یاد گرفتم.", 5, safe(1), 1),

            // ==================== Kotlin (course[2]) ====================
            makeComment("کاتلین رو با این دوره خیلی خوب یاد گرفتم. پروژه‌ها واقعی و کاربردی بودن.", 5, safe(0), 2),
            makeComment("کیفیت صدا توی بعضی جلسات افت داره. لطفاً درستش کنید.", 1, safe(7), 2, "چک می‌کنیم و دوباره ضبط می‌کنیم. 🎙️"),
            makeComment("قیمتش نسبت به محتوا یکم زیاده. دوره‌های مشابه ارزون‌تر هستن.", 2, safe(9), 2, "تخفیف‌های مناسبتی داریم. 😉"),
            makeComment("جاوا کار میکردم، کاتلین رو با این دوره یاد گرفتم.", 3, safe(11), 2),

            // ==================== Frontend (course[3]) ====================
            makeComment("مسیر فرانت‌اند رو کامل یاد گرفتم. از HTML تا JavaScript همه چی عالی بود.", 4, safe(1), 3),
            makeComment("بخش CSS عالی بود ولی JavaScript یکم سریع بود.", 3, safe(8), 3, "دوره مقدماتی JavaScript به‌زودی میاد. 📚"),
            makeComment("با این دوره تونستم توی یه شرکت خوب استخدام بشم.", 5, safe(2), 3, "تبریک میگم! 👏"),
            makeComment("پروژه‌هاش قدیمی شدن. کاش با React هم داشت.", 3, safe(3), 3),

            // ==================== Security 1 (course[4]) ====================
            makeComment("امنیت شبکه رو خیلی خوب توضیح دادین. OWASP رو کامل یاد گرفتم.", 5, safe(10), 4),
            makeComment("ابزارها رو خوب یاد دادین ولی کاش مثال‌های واقعی‌تری بود.", 3, safe(11), 4, "توی آپدیت سناریوهای واقعی اضافه می‌کنیم. ✅"),
            makeComment("بعد از این دوره تونستم توی شرکت خودمون تست نفوذ انجام بدم.", 4, safe(4), 4),

            // ==================== Security 2 (course[5]) ====================
            makeComment("هک اخلاقی رو خیلی جذاب درس دادین. Kali Linux رو کامل یاد گرفتم.", 5, safe(0), 5),
            makeComment("بخش Metasploit یکم قدیمی بود. کاش آپدیت کنید.", 3, safe(6), 5, "حتماً توی آپدیت ۲۰۲۶ به‌روز می‌کنیم. 🔄"),
            makeComment("دوره عالی بود. تونستم باگ‌های سایت خودمون رو پیدا کنم.", 5, safe(5), 5),

            // ==================== Network (course[6]) ====================
            makeComment("برای CCNA عالی بود. خیلی کمکم کرد برای آزمون آماده بشم.", 5, safe(7), 6),
            makeComment("بخش Subnetting رو خوب توضیح دادین.", 3, safe(1), 6),
            makeComment("پیکربندی سیسکو یکم گیج‌کننده بود.", 3, safe(9), 6, "جلسات بیشتری اضافه می‌کنیم. ⚙️"),

            // ==================== DevOps (course[7]) ====================
            makeComment("Docker و Kubernetes رو خیلی خوب یاد دادین.", 5, safe(8), 7),
            makeComment("بخش AWS یکم سریع رد شد.", 3, safe(3), 7, "جلسات AWS رو گسترش میدیم. ☁️"),
            makeComment("CI/CD رو عالی توضیح دادین.", 5, safe(10), 7),

            // ==================== React/Next.js (course[8]) ====================
            makeComment("React رو خیلی خوب توضیح دادین. Next.js هم عالی بود.", 5, safe(0), 8, "خوشحالیم که راضی بودی! 🚀"),
            makeComment("بخش SSR یکم پیچیده بود.", 3, safe(5), 8, "توی آپدیت اضافه می‌کنیم. 📚"),
            makeComment("با این دوره تونستم یه پروژه واقعی بزنم.", 4, safe(2), 8),

            // ==================== Golang (course[9]) ====================
            makeComment("Go واقعاً زبان قدرتمندیه. ممنون از دوره خوب.", 5, safe(6), 9),
            makeComment("میکروسرویس‌ها رو خیلی خوب توضیح دادین.", 5, safe(1), 9),
            makeComment("بخش Concurrency یکم گیج‌کننده بود.", 3, safe(7), 9, "جلسات بیشتری اضافه می‌کنیم. ⚡"),
        ];

        const validComments = commentsData.filter(c => c.user && c.course);
        const created = await Comment.insertMany(validComments);
        console.log(`✅ ${created.length} comments created`);

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

module.exports = seedComments;