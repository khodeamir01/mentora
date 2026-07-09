const  User  = require("./../models/User");
const CourseUser = require('./../models/Course-User');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("./../redis");


exports.showRegisterView = async (req, res) => {
    res.render("register.ejs", {messages: req.flash() })
}

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const isUserExist = await User.findOne({
      $or: [{username, email}]
    });
    if (isUserExist) {
     return res.render("login", {
       messages: {
         error: "ایمیل یا نام کاربری تکراری است , لطقا لاگین کنید",
          redirect: "/auth/register",
        }
        });
    }
    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { id: user.id, role: user.roles },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS + "s" }
    );

      const hashedAcceessToken = await bcryptjs.hash(accessToken, 12);


    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET_KEY ,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS + "s" }
    );
    const hashedRefreshToken = await bcryptjs.hash(refreshToken, 12);

    await redis.set(
      `refreshToken:${user.id}`,
      hashedRefreshToken,
      "EX",
      process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS
    );

      res.cookie("accessToken", accessToken, {
         httpOnly: true,
         maxAge: process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
         httpOnly: true,
         maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS * 1000
      });

      res.locals.user = user

     return res.render("index", {
         messages: {
          success: "ثبت نام شما موفقیت آمیز بود , خوش آمدید",
           redirect: "/",
          }
        });
  } catch (error) {
    next(error);
  }
};

exports.showLoginView = (req, res) => {
  res.render("login.ejs", {messages: req.flash() })
}

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
    
  // پیدا کردن کاربر با email
  const user = await User.findOne({ username });
  
  if (!user) {
    return res.render("login", {
      messages: {
        error: "کاربری یافت نشد"
      }
    });
  }
  
  // چک کردن رمز عبور
  const isMatch = await bcryptjs.compare(password, user.password);
  
  if (!isMatch) {
    return res.render("login", {
      messages: {
        error: " رمز عبور اشتباه است"
      }
    });
  }

  

  const accessToken = jwt.sign(
    { id: user.id, role: user.roles },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS + "s" }
  );

  const hashedAcceessToken = await bcryptjs.hash(accessToken, 12);

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS + "s" }
  );
  const hashedRefreshToken = await bcryptjs.hash(refreshToken, 12);

  await redis.set(
    `refreshToken:${user.id}`,
    hashedRefreshToken,
    "EX",
    process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS * 1000
    
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS * 1000,
  });

  res.cookie("refreshToken",refreshToken, {
    httpOnly: true,
    maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS * 1000,
  }); 

     return res.render("login", {
         messages: {
          success: "ورود شما موفقیت آمیز بود , خوش آمدید",
           redirect: "/",
          }
        });
        
};


exports.logOut = async (req, res) => {
  const redisKey = `refreshToken:${req.user.id}`;
  await redis.del(redisKey);
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.redirect("/")
};
