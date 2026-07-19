const yup = require("yup");

exports.createCommentValidator = yup.object({
    rating: yup.number().required("امتیاز الزامی است").min(1, "حداقل ۱").max(5, "حداکثر ۵"),
    content: yup.string().required("متن نظر الزامی است").min(2, "حداقل ۲ کاراکتر"),
});

exports.addReplyValidator = yup.object({
    rating: yup.number().required("امتیاز الزامی است").min(1, "حداقل ۱").max(5, "حداکثر ۵"),
    content: yup.string().required("متن پاسخ الزامی است").min(2, "حداقل ۲ کاراکتر"),
});