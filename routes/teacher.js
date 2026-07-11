// routes/teacher.js
const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher");

router.get("/", teacherController.getAll);
router.get("/:id", teacherController.getOne);

module.exports = router;