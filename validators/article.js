const yup = require("yup");

exports.createArticleValidator = yup.object({
    title: yup.string().required("عنوان مقاله الزامی است").min(5, "حداقل ۵ کاراکتر"),
    description: yup.string().required("توضیحات الزامی است").max(300, "حداکثر ۳۰۰ کاراکتر"),
    content: yup.string().required("محتوا الزامی است"),
    slug: yup.string().required("اسلاگ الزامی است").matches(/^[a-z0-9\-]+$/, "فقط حروف انگلیسی، اعداد و خط تیره"),
    category: yup.string().nullable(),
    tags: yup.string().nullable(),
    status: yup.string().oneOf(["draft", "published"], "وضعیت نامعتبر").default("draft"),
});

exports.updateArticleValidator = yup.object({
    title: yup.string().min(5, "حداقل ۵ کاراکتر").nullable(),
    description: yup.string().max(300, "حداکثر ۳۰۰ کاراکتر").nullable(),
    content: yup.string().nullable(),
    slug: yup.string().matches(/^[a-z0-9\-]+$/, "فقط حروف انگلیسی، اعداد و خط تیره").nullable(),
    category: yup.string().nullable(),
    tags: yup.string().nullable(),
    status: yup.string().oneOf(["draft", "published"], "وضعیت نامعتبر").nullable(),
});

exports.commentValidator = yup.object({
    content: yup.string().required("متن کامنت الزامی است").min(2, "حداقل ۲ کاراکتر"),
});