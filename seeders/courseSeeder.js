const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

const seedCourses = async () => {
    try {
        await Course.deleteMany({});
        console.log("🧹 Old courses cleared");

        const categories = await Category.find({});
        const catMap = {};
        categories.forEach(c => catMap[c.title] = c._id);

        const teacher = await User.findOne({ roles: "TEACHER" });
        const admin = await User.findOne({ roles: "ADMIN" });

        const courses = [
            { name: "آموزش جامع Node.js", href: "nodejs-complete-course", description: "Node.js رو از صفر مطلق تا ساخت APIهای حرفه‌ای و مقیاس‌پذیر یاد بگیر. توی این دوره ابتدا با مفاهیم پایه مثل Event Loop، ماژول‌ها، File System و NPM آشنا میشی. بعد می‌رسی به Express.js و یاد می‌گیری چطور یه RESTful API کامل بسازی. MongoDB و Mongoose رو برای ذخیره‌سازی داده‌ها استفاده می‌کنیم و با JWT و bcrypt یه سیستم احراز هویت امن پیاده‌سازی می‌کنی. آپلود فایل با Multer، ارسال ایمیل با Nodemailer، پرداخت آنلاین با زرین‌پال و پیاده‌سازی معماری MVC رو هم پوشش میدیم. در نهایت همه چیز رو توی یه پروژه فروشگاهی کامل کنار هم می‌ذاری که می‌تونی توی رزومه‌ات نشون بدی.", price: 499000, status: "published", categoryID: catMap["Backend"], creator: admin._id, teacher: teacher._id, cover: "nodejs.jpg" },
            { name: "دوره توسعه اندروید با کاتلین", href: "android-kotlin-course", description:  "برنامه‌نویسی اندروید رو با کاتلین، مدرن‌ترین و محبوب‌ترین زبان توسعه اپلیکیشن‌های موبایل، از پایه تا پیشرفته یاد بگیر. توی این دوره با محیط Android Studio آشنا میشی و مفاهیم پایه مثل Activity، Fragment، Layout و RecyclerView رو کامل درک می‌کنی. بعد می‌ریم سراغ مباحث پیشرفته‌تر مثل Retrofit برای ارتباط با سرور، Room Database برای ذخیره‌سازی محلی، Navigation Component برای مدیریت صفحات، و MVVM Architecture برای ساخت اپلیکیشن‌های تمیز و قابل نگهداری. هر فصل شامل پروژه‌های عملی هست و در انتهای دوره یه اپلیکیشن کامل مثل فروشگاه اینترنتی یا اپ آب‌وهوا می‌سازی. اگه می‌خوای وارد بازار کار اندروید بشی، این دوره دقیقاً همون چیزیه که نیاز داری.", price: 599000, status: "published", categoryID: catMap["Mobile App"], creator: admin._id, teacher: teacher._id, cover: "kotlin.jpg" },
            { name: "دوره آموزش فرانت‌اند", href: "frontend-html-css-js", description: "مسیر فرانت‌اند رو از صفر مطلق شروع کن و به یه توسعه‌دهنده حرفه‌ای تبدیل شو. توی این دوره ابتدا با HTML5 و سمانتیک وب آشنا میشی و یاد می‌گیری چطور ساختار صفحات رو اصولی بچینی. بعد می‌ریم سراغ CSS3 و تمام مفاهیم مدرن مثل Flexbox، Grid، Animations، Transitions و Media Queries رو برای طراحی واکنش‌گرا یاد می‌گیری. JavaScript رو از پایه شروع می‌کنیم و به مباحث پیشرفته مثل DOM Manipulation، Events، Async/Await، Fetch API و ES6+ می‌رسیم. هر فصل شامل پروژه‌های عملی مثل لندینگ پیج، فرم‌های تعاملی و یه داشبورد کامل هست. در انتهای دوره می‌تونی هر طرحی رو با کد تمیز و استاندارد پیاده‌سازی کنی و آماده ورود به بازار کار فرانت‌اند بشی.", price: 399000, status: "published", categoryID: catMap["Frontend"], creator: admin._id, teacher: teacher._id, cover: "frontend.png" },
            { name: "آموزش Tailwind CSS", href: "tailwind-mentorship", description: "Tailwind CSS رو از صفر تا حرفه‌ای با منتورینگ اختصاصی و پروژه‌های واقعی یاد بگیر. توی این دوره با فلسفه Utility-First آشنا میشی و یاد می‌گیری چطور بدون نوشتن حتی یه خط CSS سفارشی، رابط‌های کاربری زیبا و واکنش‌گرا بسازی. از نصب و راه‌اندازی شروع می‌کنیم و بعد می‌ریم سراغ Typography، Colors، Spacing، Flexbox و Grid در Tailwind. مباحث پیشرفته مثل Custom Theme، Dark Mode، Animations، کامپوننت‌های قابل استفاده مجدد و Responsive Design رو کامل پوشش میدیم. هر جلسه شامل تمرین عملی هست و توی پروژه نهایی یه لندینگ پیج کامل و یه داشبورد ادمین رو با هم می‌سازیم. این دوره برای کسایی که می‌خوان سرعت طراحی UI رو چند برابر کنن و کد تمیزتری بنویسن، عالیه.", price: 299000, status: "published", categoryID: catMap["Frontend"], creator: admin._id, teacher: teacher._id, cover: "tailwind.jpg" },
        ];

        await Course.insertMany(courses);
        console.log("✅ Courses created");

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

module.exports = seedCourses;
