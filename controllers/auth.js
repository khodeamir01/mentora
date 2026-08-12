const  User  = require("./../models/User");
const CourseUser = require('./../models/Course-User');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("./../redis");


exports.showRegisterView = async (req, res) => {
    res.render("auth/register.ejs", {messages: req.flash() })
}

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const isUserExist = await User.findOne({ $or: [{username, email}] });
    
    if (isUserExist) {
      return res.json({ 
        success: false, 
        error: "ایمیل یا نام کاربری تکراری است" 
      });
    }
    
    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = await User.create({
      name, username, email, password: hashedPassword
    });

    const accessToken = jwt.sign(
      { id: user.id, role: user.roles },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS + "s" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS + "s" }
    );

    await redis.set(`refreshToken:${user.id}`, refreshToken, "EX", Number(process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS));

    res.cookie("accessToken", accessToken, { 
      httpOnly: true, 
      maxAge: Number(process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS) * 1000 
    });
    res.cookie("refreshToken", refreshToken, { 
      httpOnly: true, 
      maxAge: Number(process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS) * 1000 
    });

    return res.json({ success: true, message: "ثبت‌نام موفقیت‌آمیز بود" });

  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};

exports.showLoginView = (req, res) => {
  res.render("auth/login.ejs", {messages: req.flash() })
}

exports.login = async (req, res, next) => {
  try {
      const { username, password } = req.body;
      console.log("Login body:", { username, password }); // ← دیباگ ببین چی میاد
      
      const user = await User.findOne({ username });
      
      if (!user) {
          return res.json({ success: false, error: "کاربری یافت نشد" });
      }
      
      const isMatch = await bcryptjs.compare(password, user.password);
      
      if (!isMatch) {
          return res.json({ success: false, error: "رمز عبور اشتباه است" });
      }
      
      const accessToken = jwt.sign(
          { id: user.id, role: user.roles },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS) }
      );
      
      const refreshToken = jwt.sign(
          { id: user.id },
          process.env.REFRESH_TOKEN_SECRET_KEY,
          { expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS) }
      );
      
      await redis.set(
          `refreshToken:${user.id}`,
          refreshToken,
          "EX",
          Number(process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS)
      );
      
      res.cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: Number(process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS) * 1000,
      });
      
      res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: Number(process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS) * 1000,
      });
      
      return res.json({ 
          success: true, 
          message: "ورود موفقیت‌آمیز بود" 
      });
      
  } catch (error) {
      console.log("Login error:", error.message);
      return res.json({ success: false, error: error.message });
  }
};

exports.googleLogin = async (req, res) => {
  try {
      const user = req.user; // passport user رو توی req.user می‌ذاره

      const accessToken = jwt.sign(
          { id: user.id, role: user.roles },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS + "s" }
      );

      const refreshToken = jwt.sign(
          { id: user.id },
          process.env.REFRESH_TOKEN_SECRET_KEY,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS + "s" }
      );

      const hashedRefreshToken = await bcryptjs.hash(refreshToken, 12);
      await redis.set(`refreshToken:${user.id}`, hashedRefreshToken, "EX", process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS);

      res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS * 1000 });
      res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS * 1000 });

      return res.redirect("/");

  } catch (error) {
      console.error("Google login error:", error);
      return res.redirect("/auth/login");
  }
};


exports.logOut = async (req, res) => {
  const redisKey = `refreshToken:${req.user.id}`;
  await redis.del(redisKey);
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.redirect("/")
};
