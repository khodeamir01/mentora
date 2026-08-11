// seeders/commentSeeder.js
const Comment = require("../models/Comment");
const User = require("../models/User");
const Course = require("../models/Course");

const seedComments = async () => {
    try {
        await Comment.deleteMany({});
        console.log("🧹 Old comments cleared");

        const users = await User.find({ roles: "USER" });
        const supportUser = await User.findOne({ roles: "SUPPORT" });
        const courses = await Course.find({});

        if (users.length === 0 || courses.length === 0) {
            console.log("⚠️ No users or courses found");
            return;
        }

        const commentsData = [
            // ========== Node.js Course ==========
            {
                content: "دوره Node.js فوق‌العاده بود. از صفر شروع کردم و الان میتونم APIهای حرفه‌ای بسازم. ممنون از مدرس عزیز.",
                rating: 5,
                user: users[0]._id,
                course: courses[0]._id,
                replies: [
                    {
                        content: "سلام محمد جان، خوشحالیم که دوره برات مفید بوده. اگه سوالی داشتی حتماً بپرس. 🙌",
                        user: supportUser._id,
                        rating: 5
                    }
                ]
            },
            {
                content: "محتوای دوره خوب بود ولی سرعت تدریس یکم بالاست. اگه آروم‌تر توضیح میدادن بهتر بود.",
                rating: 3,
                user: users[4]._id,
                course: courses[0]._id,
                replies: [
                    {
                        content: "ممنون از بازخوردت امیرحسین جان. حتماً به مدرس منتقل می‌کنیم. می‌تونی سرعت پخش ویدیو رو هم کم کنی. ✅",
                        user: supportUser._id,
                        rating: 4
                    }
                ]
            },
            {
                content: "بخش authentication خیلی گیج‌کننده بود. مثال‌های بیشتری نیاز داره.",
                rating: 2,
                user: users[8]._id,
                course: courses[0]._id,
                replies: [
                    {
                        content: "سلام آرش جان، حق با توئه. توی آپدیت بعدی جلسات بیشتری برای JWT و Auth اضافه می‌کنیم. ممنون از صراحتت. 🙏",
                        user: supportUser._id,
                        rating: 5
                    }
                ]
            },
            {
                content: "واقعاً عالی بود. فقط کاش جلسات بیشتری برای WebSocket و GraphQL هم داشت.",
                rating: 4,
                user: users[2]._id,
                course: courses[0]._id,
            },

            // ========== Kotlin Course ==========
            {
                content: "دوره کاتلین بهترین دوره‌ای بود که دیدم. پروژه‌ها خیلی واقعی و کاربردی بودن.",
                rating: 5,
                user: users[0]._id,
                course: courses[1]._id
            },
            {
                content: "من قبلاً جاوا کار میکردم، کاتلین رو با این دوره یاد گرفتم. واقعاً راضیم.",
                rating: 5,
                user: users[6]._id,
                course: courses[1]._id,
                replies: [
                    {
                        content: "خیلی خوشحالیم که تونستی با دوره ما به کاتلین مسلط بشی. موفق باشی! 🚀",
                        user: supportUser._id,
                        rating: 5
                    }
                ]
            },
            {
                content: "دوره خوبیه ولی کیفیت صدا توی بعضی جلسات افت داره. لطفاً درستش کنید.",
                rating: 3,
                user: users[5]._id,
                course: courses[1]._id,
                replies: [
                    {
                        content: "سلام فاطمه جان، ممنون که گفتی. چک می‌کنیم و اگه مشکلی هست حتماً دوباره ضبط می‌کنیم. 🎙️",
                        user: supportUser._id,
                        rating: 5
                    }
                ]
            },
            {
                content: "قیمتش نسبت به محتوا یکم زیاده. دوره‌های مشابه ارزون‌تر هستن.",
                rating: 2,
                user: users[7]._id,
                course: courses[1]._id,
                replies: [
                    {
                        content: "سلام سینا جان، ما همیشه تخفیف‌های مناسبتی داریم. حواست به جشنواره‌ها باشه. 😉",
                        user: supportUser._id,
                        rating: 4
                    }
                ]
            },

            // ========== Frontend Course ==========
            {
                content: "دوره فرانت‌اند مسیر شغلی منو عوض کرد. از HTML تا JavaScript رو پروژه‌محور یاد گرفتم.",
                rating: 5,
                user: users[1]._id,
                course: courses[2]._id
            },
            {
                content: "بعد از این دوره تونستم توی یه شرکت خوب استخدام بشم. واقعاً ممنونم.",
                rating: 5,
                user: users[2]._id,
                course: courses[2]._id,
                replies: [
                    {
                        content: "تبریک میگم مریم جان! 👏 استخدامت رو تبریک میگیم. همیشه باعث افتخار ماست.",
                        user: supportUser._id,
                        rating: 5
                    }
                ]
            },
            {
                content: "بخش CSS عالی بود ولی JavaScript یکم پیچیده توضیح داده شد. مبتدی‌ها اذیت میشن.",
                rating: 3,
                user: users[9]._id,
                course: courses[2]._id,
                replies: [
                    {
                        content: "سلام نرگس جان، حق با توئه. داریم یه دوره مقدماتی JavaScript جداگونه آماده می‌کنیم. به‌زودی منتشر میشه. 📚",
                        user: supportUser._id,
                        rating: 5
                    }
                ]
            },
            {
                content: "پروژه‌هاش قدیمی شدن. کاش با React یا Vue هم یه بخشی داشت.",
                rating: 3,
                user: users[3]._id,
                course: courses[2]._id
            },

            // ========== Tailwind Course ==========
            {
                content: "Tailwind CSS رو با این دوره خیلی سریع یاد گرفتم. دیگه از CSS خسته نمیشم!",
                rating: 5,
                user: users[1]._id,
                course: courses[3]._id
            },
            {
                content: "منتورینگ عالی بود. استاد واقعاً پیگیر بود و سوالات رو سریع جواب میداد.",
                rating: 5,
                user: users[4]._id,
                course: courses[3]._id,
                replies: [
                    {
                        content: "ممنون ازت امیرحسین جان. خوشحالیم که منتورینگ برات مفید بوده. 💪",
                        user: supportUser._id,
                        rating: 5
                    }
                ]
            },
            {
                content: "خوبه ولی خیلی کوتاهه. فقط ۱۶ جلسه است. انتظار داشتم بیشتر باشه.",
                rating: 3,
                user: users[6]._id,
                course: courses[3]._id,
                replies: [
                    {
                        content: "سلام کیانوش جان، داری آپدیت جدید رو آماده می‌کنیم با ۸ جلسه اضافه. صبور باش 😊",
                        user: supportUser._id,
                        rating: 5
                    }
                ]
            },
            {
                content: "صفر تا صدش رو یاد گرفتم ولی ای کاش یه پروژه بزرگ آخر دوره بود.",
                rating: 4,
                user: users[11]._id,
                course: courses[3]._id
            },
            {
                content: "حجم ویدیوها زیاده و دانلودشون سخته. بشه حجمش رو کمتر کنید؟",
                rating: 2,
                user: users[10]._id,
                course: courses[3]._id,
                replies: [
                    {
                        content: "سلام محدثه جان، چشم. توی آپدیت بعدی ویدیوها رو با کیفیت‌های مختلف آپلود می‌کنیم. 📹",
                        user: supportUser._id,
                        rating: 5
                    }
                ]
            },
        ];

        const created = await Comment.insertMany(commentsData);
        console.log(`✅ ${created.length} comments created with replies`);
        
        created.forEach((c, i) => {
            console.log(`  ${i + 1}. ${"⭐".repeat(c.rating)} | ${c.content.substring(0, 50)}...`);
        });

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

module.exports = seedComments;