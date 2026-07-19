const yup = require("yup");

exports.createCourseValidator = yup.object({
    name: yup.string().required("نام دوره الزامی است").min(3, "حداقل ۳ کاراکتر"),
    description: yup.string().required("توضیحات الزامی است").min(10, "حداقل ۱۰ کاراکتر"),
    price: yup.number().required("قیمت الزامی است").min(0, "قیمت نمی‌تواند منفی باشد"),
    href: yup.string().required("لینک دوره الزامی است").matches(/^[a-z0-9\-]+$/, "فقط حروف انگلیسی و خط تیره"),
    categoryID: yup.string().required("دسته‌بندی الزامی است"),
    teacherId: yup.string().required("مدرس الزامی است"),
    status: yup.string().oneOf(["published", "draft"], "وضعیت نامعتبر").default("published"),
});

exports.createSessionValidator = yup.object({
    title: yup.string().required("عنوان جلسه الزامی است"),
    free: yup.boolean().nullable(),
    description: yup.string().nullable(),
});