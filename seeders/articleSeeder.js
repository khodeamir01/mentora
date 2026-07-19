// seeders/articleSeeder.js
const mongoose = require("mongoose");
const Article = require("../models/Article");
const User = require("../models/User");
const Category = require("../models/Category");

const seedArticles = async () => {
    try {
        await Article.deleteMany({});
        console.log("🧹 Old articles cleared");

        const author = await User.findOne({ roles: "AUTHOR" });
        const categories = await Category.find({});
        const catMap = {};
        categories.forEach(c => catMap[c.title] = c._id);

        const articles = [
            {
                title: "راهنمای کامل React Hooks",
                slug: "react-hooks-guide",
                description: "React Hooks از نسخه ۱۶.۸ معرفی شدن و انقلابی در نحوه نوشتن کامپوننت‌های React ایجاد کردن. دیگه نیازی به کامپوننت‌های کلاسی نیست و می‌تونی تمام منطق state و lifecycle رو توی کامپوننت‌های تابعی مدیریت کنی.",
                content: "<h2>React Hooks چیست؟</h2><p>هوک‌ها توابعی هستن که به شما اجازه میدن از قابلیت‌های state و lifecycle توی کامپوننت‌های تابعی استفاده کنید. قبل از هوک‌ها، فقط کامپوننت‌های کلاسی می‌تونستن state داشته باشن.</p><h2>useState - ساده‌ترین هوک</h2><p>این هوک برای مدیریت state توی کامپوننت استفاده میشه. کافیه مقدار اولیه رو بهش بدی و یه آرایه برمی‌گردونه که شامل مقدار فعلی و تابع تغییر دهندست.</p><pre><code>const [count, setCount] = useState(0); // count = مقدار فعلی // setCount = تابع تغییر دهنده</code></pre><h2>useEffect - جایگزین lifecycle</h2><p>این هوک کار componentDidMount، componentDidUpdate و componentWillUnmount رو انجام میده. برای side effect ها مثل fetch داده، subscription و دستکاری DOM عالیه.</p><pre><code>useEffect(() => { // این کد بعد از هر رندر اجرا میشه document.title = `کلیک شده: ${count} بار`; }, [count]); // فقط وقتی count تغییر کنه اجرا میشه</code></pre><h2>useContext - مدیریت state سراسری</h2><p>بجای props drilling می‌تونی از Context استفاده کنی. useContext دسترسی به Context رو خیلی ساده می‌کنه.</p><h2>useRef - دسترسی مستقیم به DOM</h2><p>برای دسترسی به المنت‌های DOM یا نگه‌داشتن یه مقدار mutable که باعث رندر مجدد نشه استفاده میشه.</p><pre><code>const inputRef = useRef(null); // فوکوس روی input inputRef.current?.focus();</code></pre><h2>قوانین هوک‌ها</h2><blockquote>۱. هوک‌ها رو فقط توی سطح بالای کامپوننت صدا بزن (نه توی شرط و حلقه)<br> ۲. هوک‌ها رو فقط توی کامپوننت‌های تابعی یا Custom Hooks استفاده کن</blockquote><h2>نتیجه‌گیری</h2><p>React Hooks نوشتن کد تمیزتر، خواناتر و قابل استفاده مجدد رو ممکن می‌کنن. با یادگیری useState، useEffect و useContext می‌تونی ۹۰٪ نیازهات رو پوشش بدی.</p>",
                cover: "/img/articles/react-hooks.jpg",
                author: author._id,
                category: catMap["Frontend"],
                tags: ["react", "hooks", "frontend", "javascript"],
                status: "published"
            },
            {
                title: "احراز هویت با JWT در Node.js",
                slug: "jwt-auth-nodejs",
                description: "JWT یا JSON Web Token یکی از محبوب‌ترین روش‌های احراز هویت در برنامه‌های مدرن است. در این مقاله یاد می‌گیری چطور یه سیستم لاگین امن با JWT توی Node.js پیاده‌سازی کنی.",
                content: "<h2>JWT چیه و چرا بهش نیاز داریم؟</h2><p>JSON Web Token یه استاندارد باز (RFC 7519) برای انتقال امن اطلاعات بین دو طرف به صورت یه آبجکت JSON فشرده است. برخلاف Session-based Auth که اطلاعات توی سرور ذخیره میشه، JWT همه چی رو توی خودش نگه میداره و این یعنی Stateless بودن.</p><h2>ساختار JWT</h2><p>یه توکن JWT از سه بخش تشکیل شده که با نقطه از هم جدا میشن:</p><pre><code>header.payload.signature // مثال واقعی: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YWJjMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></pre><p>هر بخش کاربرد خاص خودش رو داره. Header الگوریتم رمزنگاری رو مشخص میکنه، Payload داده‌های کاربر رو نگه میداره و Signature امضای دیجیتال برای اعتبارسنجی توکنه.</p><h2>پیاده‌سازی در Node.js</h2><p>اول پکیج jsonwebtoken رو نصب کن:</p><pre><code>npm install jsonwebtoken bcryptjs</code></pre><p>حالا یه تابع برای ساخت توکن موقع لاگین:</p><pre><code>const jwt = require('jsonwebtoken'); function generateToken(user) { return jwt.sign( { userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' } ); }</code></pre><p>توکن ۷ روز اعتبار داره. هر وقت خواستی میتونی این زمان رو کم یا زیاد کنی. برای پروژه‌های حساس ۱۵ دقیقه یا ۱ ساعت مناسبه.</p><h2>میدلور محافظت از مسیرها</h2><p>برای محافظت از APIها یه middleware می‌نویسیم که توکن رو از هدر Authorization میخونه و اعتبارسنجی می‌کنه:</p><pre><code>const auth = async (req, res, next) => { try { const token = req.header('Authorization')?.replace('Bearer ', ''); if (!token) { throw new Error('توکن ارسال نشده'); } const decoded = jwt.verify(token, process.env.JWT_SECRET); req.user = await User.findById(decoded.userId).select('-password'); next(); } catch (error) { res.status(401).json({ error: 'دسترسی غیرمجاز' }); } };</code></pre><h2>Refresh Token چیه و کی به کار میاد؟</h2><p>Access Token ها معمولاً عمر کوتاهی دارن (۱۵ دقیقه تا ۱ ساعت). Refresh Token عمر طولانی‌تری داره (۷ تا ۳۰ روز) و برای ساختن Access Token جدید استفاده میشه. اینطوری اگه Access Token دزدیده بشه، فقط برای مدت کوتاهی قابل استفاده است.</p><h2>نکات امنیتی مهم</h2><blockquote> ۱. همیشه از HTTPS استفاده کن<br> ۲. Secret Key رو توی .env نگه دار، نه توی کد<br> ۳. توکن رو توی localStorage ذخیره نکن (XSS attack)<br> ۴. از httpOnly cookie استفاده کن<br> ۵. expiry time کوتاه برای Access Token بذار </blockquote><h2>Blacklist کردن توکن</h2><p>JWT ذاتاً Stateless هست و تا زمان انقضا معتبر می‌مونه. برای invalidate کردن توکن (مثلاً موقع خروج کاربر)، میتونی از Redis برای نگهداری Blacklist استفاده کنی:</p><pre><code>// موقع logout await redis.setex(`blacklist:${token}`, 604800, '1'); // ۷ روز // توی middleware const isBlacklisted = await redis.get(`blacklist:${token}`); if (isBlacklisted) throw new Error('توکن نامعتبر است');</code></pre><h2>جمع‌بندی</h2><p>JWT یه راه‌حل عالی برای احراز هویت در APIهای REST و میکروسرویس‌هاست. با رعایت نکات امنیتی و استفاده از Refresh Token میتونی یه سیستم امن و مقیاس‌پذیر بسازی.</p>",
                cover: "/img/articles/jwt-auth.jpg",
                author: author._id,
                category: catMap["Backend"],
                tags: ["nodejs", "jwt", "backend", "security"],
                status: "published"
            },

            {
                title: "CI/CD چیه و چرا هر توسعه‌دهنده‌ای باید بلد باشه؟",
                slug: "ci-cd",
                description: "CI/CD مخفف Continuous Integration و Continuous Deployment هست. یه روش مدرن برای خودکارسازی تست، build و deploy پروژه‌ها. توی این مقاله با مفاهیم پایه، ابزارهای محبوب و یه مثال عملی با GitHub Actions آشنا میشی.",
                content: "<h2>CI/CD یعنی چی دقیقاً؟</h2><p>قدیما آپدیت کردن یه پروسه دستی و پر از استرس بود. همه چی رو با FTP آپلود می‌کردیم و دعا می‌کردیم سایت نشکنه! CI/CD اومد این کابوس رو تموم کنه.</p><p>CI یا Continuous Integration یعنی هر بار که کدت رو push می‌کنی، یه سری تست خودکار روش اجرا بشه تا مطمئن بشی چیزی رو خراب نکردی.</p><p>CD یا Continuous Deployment یعنی بعد از تست موفق، کدت خودکار بره روی سرور اصلی deploy بشه. دیگه خبری از آپلود دستی نیست.</p><h2>پایپلاین چیه؟</h2><p>پایپلاین مثل یه خط تولید می‌مونه که کدت ازش رد میشه و مرحله به مرحله پردازش میشه:</p><blockquote> ۱. کد push میشه به گیت‌هاب<br> ۲. تست‌ها اجرا میشن<br> ۳. کد build میشه<br> ۴. روی سرور staging deploy میشه<br> ۵. اگه همه چی اوکی بود، میره به production </blockquote><h2>ابزارهای محبوب CI/CD</h2><p>کلی ابزار مختلف وجود داره. ببینیم محبوب‌ترین‌هاش کدوما هستن:</p><h3>GitHub Actions</h3><p>اگه پروژه‌ات روی گیت‌هابه، بهترین گزینه همینه. یه فایل YAML توی مسیر `github/workflows/.` می‌سازی و همه چی خودکار انجام میشه. رایگان برای ریپوهای عمومی.</p><h3>GitLab CI</h3><p>مشابه GitHub Actions ولی برای گیت‌لب. فایل `gitlab-ci.yml.` رو توی root پروژه می‌ذاری. Runnerهای اختصاصی داره که سرعت بالایی دارن.</p><h3>Jenkins</h3><p>قدیمی‌ترین و قدرتمندترین. متن‌بازه، کلی پلاگین داره ولی راه‌اندازیش نسبت به بقیه پیچیده‌تره. برای پروژه‌های بزرگ سازمانی عالیه.</p><h2>یه مثال واقعی با GitHub Actions</h2><p>فرض کن یه پروژه Node.js داری. می‌خوای هر وقت روی main پوش کردی، اول تست‌ها اجرا بشن، بعد deploy بشه روی سرور:</p><pre><code>name: Deploy to Production on: push: branches: [main] jobs: test: runs-on: ubuntu-latest steps: - uses: actions/checkout@v3 - uses: actions/setup-node@v3 with: node-version: 18 - run: npm install - run: npm test deploy: needs: test runs-on: ubuntu-latest steps: - name: Deploy to server uses: appleboy/ssh-action@v0.1.7 with: host: ${{ secrets.SERVER_HOST }} username: ${{ secrets.SERVER_USER }} key: ${{ secrets.SSH_KEY }} script: | cd /var/www/myapp git pull origin main npm install pm2 restart app</code></pre><p>ببین چقدر ساده است! هر بار که push کنی روی main، اول تست‌ها اجرا میشن. اگه موفق بودن، SSH میزنه به سرور، کد جدید رو pull میکنه، dependency ها رو نصب میکنه و اپ رو ری‌استارت میکنه.</p><h2>Environment Variables رو چطور مدیریت کنیم؟</h2><p>حواست باشه secret ها مثل رمز دیتابیس و API key رو توی کد نذاری. توی تنظیمات مخزن گیت‌هاب، بخش Secrets میتونی این مقادیر رو ذخیره کنی و توی workflow با `secrets.SECRET_NAME` بهشون دسترسی داشته باشی.</p><h2>مزایای CI/CD</h2><p>چرا باید از CI/CD استفاده کنی؟</p><p>اول اینکه خطای انسانی رو به صفر می‌رسونه. دیگه خبری از یادم رفت فلان فایل رو آپلود کنم نیست. دوم اینکه سرعت deploy رو چند برابر می‌کنه. سومی اینکه با تست‌های خودکار، باگ‌ها قبل از رسیدن به کاربر پیدا میشن.</p><h2>جمع‌بندی</h2><p>CI/CD دیگه یه گزینه لوکس نیست، یه نیاز اساسیه. با GitHub Actions می‌تونی توی ۱۰ دقیقه اولین پایپلاینت رو بسازی. از همین امروز شروع کن و کدت رو خودکار deploy کن!</p>",
                cover: "/img/articles/cicd.jpg",
                author: author._id,
                category: catMap["DevOps"],
                tags: ["cicd", "github", "devops", "automation"],
                status: "published"
            },
        ];

        const created = await Article.insertMany(articles);
        console.log(`✅ ${created.length} articles created`);
        created.forEach(a => console.log(`  ${a.title}`));
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mentora").then(seedArticles);