const express = require("express");
const multer = require("multer");
const auth = require("./../middlewares/auth");
const Controller = require("./../controllers/course");
const roleGuard = require("./../middlewares/roleGuard")
const { multerStorage } = require("../utils/multerConfigs");
const upload = multerStorage("public/assets/img");

const router = express.Router();

// 1. لیست همه دوره‌ها
router.get("/",auth ,Controller.getAllCourses);

// 2. ایجاد دوره (GET فرم + POST ثبت) - هر دو روی /create
router.route("/create")
    .get(auth, Controller.showCreateCoursePanel)    // نمایش فرم
    .post(upload.single("cover"), auth, Controller.create);  // ثبت دوره

// 3. جزئیات دوره
router.get("/:href", auth, Controller.getOneCourse);

// 4. ایجاد جلسه
router.post("/:courseId/sessions", auth, roleGuard("TEACHER"), upload.single("video"), Controller.createSession)
router.get("/:courseId/sessions/create", auth, roleGuard("TEACHER"), Controller.createSessionPage);

module.exports = router;