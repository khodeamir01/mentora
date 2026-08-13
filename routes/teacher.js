
const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher");
const auth = require("../middlewares/auth");

router.get("/", auth, teacherController.getAll);
router.get("/:id", auth , teacherController.getOne);

module.exports = router;