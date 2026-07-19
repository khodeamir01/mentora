const yup = require("yup");

exports.registerValidator = yup.object({
    name: yup.string().required("نام الزامی است").min(3, "حداقل ۳ کاراکتر"),
    username: yup.string().required("نام کاربری الزامی است").min(4, "حداقل ۴ کاراکتر").matches(/^[a-zA-Z0-9_]+$/, "فقط حروف انگلیسی و عدد"),
    email: yup.string().required("ایمیل الزامی است").email("ایمیل معتبر نیست"),
    password: yup.string().required("رمز عبور الزامی است").min(8, "حداقل ۸ کاراکتر"),
});

exports.loginValidator = yup.object({
    username: yup.string().required("نام کاربری الزامی است"),
    password: yup.string().required("رمز عبور الزامی است"),
});