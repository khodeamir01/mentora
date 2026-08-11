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

        const teacher = await User.find({ roles: "TEACHER" });
        console.log(teacher);
        const admin = await User.findOne({ roles: "ADMIN" });

        const courses = [
            { name: "آموزش جامع Node.js", href: "nodejs-complete-course", description: "Node.js رو از صفر مطلق تا ساخت APIهای حرفه‌ای و مقیاس‌پذیر یاد بگیر. توی این دوره ابتدا با مفاهیم پایه مثل Event Loop، ماژول‌ها، File System و NPM آشنا میشی. بعد می‌رسی به Express.js و یاد می‌گیری چطور یه RESTful API کامل بسازی. MongoDB و Mongoose رو برای ذخیره‌سازی داده‌ها استفاده می‌کنیم و با JWT و bcrypt یه سیستم احراز هویت امن پیاده‌سازی می‌کنی. آپلود فایل با Multer، ارسال ایمیل با Nodemailer، پرداخت آنلاین با زرین‌پال و پیاده‌سازی معماری MVC رو هم پوشش میدیم. در نهایت همه چیز رو توی یه پروژه فروشگاهی کامل کنار هم می‌ذاری که می‌تونی توی رزومه‌ات نشون بدی.", price: 4990000, status: "published", categoryID: catMap["Backend"], creator: admin._id, teacher: teacher[0]._id , cover: "nodejs.jpg" },
            { name: "دوره توسعه اندروید با کاتلین", href: "android-kotlin-course", description:  "برنامه‌نویسی اندروید رو با کاتلین، مدرن‌ترین و محبوب‌ترین زبان توسعه اپلیکیشن‌های موبایل، از پایه تا پیشرفته یاد بگیر. توی این دوره با محیط Android Studio آشنا میشی و مفاهیم پایه مثل Activity، Fragment، Layout و RecyclerView رو کامل درک می‌کنی. بعد می‌ریم سراغ مباحث پیشرفته‌تر مثل Retrofit برای ارتباط با سرور، Room Database برای ذخیره‌سازی محلی، Navigation Component برای مدیریت صفحات، و MVVM Architecture برای ساخت اپلیکیشن‌های تمیز و قابل نگهداری. هر فصل شامل پروژه‌های عملی هست و در انتهای دوره یه اپلیکیشن کامل مثل فروشگاه اینترنتی یا اپ آب‌وهوا می‌سازی. اگه می‌خوای وارد بازار کار اندروید بشی، این دوره دقیقاً همون چیزیه که نیاز داری.", price: 5990000, status: "published", categoryID: catMap["Mobile App"], creator: admin._id, teacher: teacher[0]._id , cover: "kotlin.jpg" },
            { name: "دوره آموزش فرانت‌اند", href: "frontend-html-css-js", description: "مسیر فرانت‌اند رو از صفر مطلق شروع کن و به یه توسعه‌دهنده حرفه‌ای تبدیل شو. توی این دوره ابتدا با HTML5 و سمانتیک وب آشنا میشی و یاد می‌گیری چطور ساختار صفحات رو اصولی بچینی. بعد می‌ریم سراغ CSS3 و تمام مفاهیم مدرن مثل Flexbox، Grid، Animations، Transitions و Media Queries رو برای طراحی واکنش‌گرا یاد می‌گیری. JavaScript رو از پایه شروع می‌کنیم و به مباحث پیشرفته مثل DOM Manipulation، Events، Async/Await، Fetch API و ES6+ می‌رسیم. هر فصل شامل پروژه‌های عملی مثل لندینگ پیج، فرم‌های تعاملی و یه داشبورد کامل هست. در انتهای دوره می‌تونی هر طرحی رو با کد تمیز و استاندارد پیاده‌سازی کنی و آماده ورود به بازار کار فرانت‌اند بشی.", price: 3990000, status: "published", categoryID: catMap["Frontend"], creator: admin._id, teacher: teacher[1]._id , cover: "frontend.png" },
            { name: "آموزش Tailwind CSS", href: "tailwind-mentorship", description: "Tailwind CSS رو از صفر تا حرفه‌ای با منتورینگ اختصاصی و پروژه‌های واقعی یاد بگیر. توی این دوره با فلسفه Utility-First آشنا میشی و یاد می‌گیری چطور بدون نوشتن حتی یه خط CSS سفارشی، رابط‌های کاربری زیبا و واکنش‌گرا بسازی. از نصب و راه‌اندازی شروع می‌کنیم و بعد می‌ریم سراغ Typography، Colors، Spacing، Flexbox و Grid در Tailwind. مباحث پیشرفته مثل Custom Theme، Dark Mode، Animations، کامپوننت‌های قابل استفاده مجدد و Responsive Design رو کامل پوشش میدیم. هر جلسه شامل تمرین عملی هست و توی پروژه نهایی یه لندینگ پیج کامل و یه داشبورد ادمین رو با هم می‌سازیم. این دوره برای کسایی که می‌خوان سرعت طراحی UI رو چند برابر کنن و کد تمیزتری بنویسن، عالیه.", price: 2990000, status: "published", categoryID: catMap["Frontend"], creator: admin._id, teacher: teacher[1]._id , cover: "tailwind.jpg" },
            { name: "دوره جامع امنیت شبکه و وب", href: "network-security-course", description: "امنیت شبکه و وب رو از پایه تا پیشرفته یاد بگیر. توی این دوره با مفاهیم پایه امنیت مثل رمزنگاری، فایروال، IDS/IPS و VPN آشنا میشی. بعد می‌ریم سراغ امنیت وب: OWASP Top 10، SQL Injection، XSS، CSRF، و روش‌های مقابله با اونها. ابزارهایی مثل Burp Suite، Wireshark و Nmap رو یاد می‌گیری و توی سناریوهای واقعی استفاده می‌کنی. در نهایت می‌تونی تست نفوذ انجام بدی و آسیب‌پذیری‌ها رو پیدا کنی.", price: 6490000, status: "published", categoryID: catMap["Security"], creator: admin._id, teacher: teacher[2]._id, cover: "security.jpg" },
            { name: "دوره شبکه‌های کامپیوتری و زیرساخت", href: "computer-network-course", description: "شبکه‌های کامپیوتری رو از مفاهیم پایه تا راه‌اندازی زیرساخت‌های سازمانی یاد بگیر. توی این دوره با مدل OSI، TCP/IP، Subnetting، Routing و Switching آشنا میشی. پروتکل‌های HTTP، DNS، DHCP، FTP رو کامل یاد می‌گیری. پیکربندی روتر و سوییچ سیسکو، VLAN، VPN، و امنیت شبکه رو پوشش میدیم. این دوره برای کسایی که می‌خوان وارد حوزه شبکه بشن یا برای آزمون CCNA آماده بشن، مناسبه.", price: 5490000, status: "published", categoryID: catMap["Network"], creator: admin._id, teacher: teacher[3]._id, cover: "network.jpg" },
        ];

        await Course.insertMany(courses);
        console.log("✅ Courses created");

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

module.exports = seedCourses;
