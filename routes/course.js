const express = require("express");
const multer = require("multer");
const auth = require("./../middlewares/auth");
const Controller = require("./../controllers/course");
const roleGuard = require("./../middlewares/roleGuard");
const {createCourseValidator,createSessionValidator } = require("../validators/course");
const { multerStorage } = require("../utils/multerConfigs");
const validate = require("../middlewares/validate");
const upload = multerStorage("public/assets/img/cover");

const router = express.Router();


router.get("/",auth ,Controller.getAllCourses);


router.route("/create")
    .get(auth, roleGuard("ADMIN"), Controller.showCreateCoursePanel)
    .post(auth, roleGuard("ADMIN"), upload.single("cover"), validate(createCourseValidator), Controller.create);


router.get("/:href", auth, Controller.getOneCourse);


router.post("/:courseId/sessions", auth, roleGuard("TEACHER"), upload.single("video"), validate(createSessionValidator) ,Controller.createSession)
router.get("/:courseId/sessions/create", auth, roleGuard("TEACHER") ,Controller.createSessionPage);

module.exports = router;