const express = require("express");
const router = express.Router();
const  auth  = require("../middlewares/auth");
const roleGuard = require("../middlewares/roleGuard");
const dashboardController = require("../controllers/dashboard");
const multer = require("multer");


const upload = multer({
    storage: multer.diskStorage({
        destination: "public/assets/img/avatar",
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    })
});


router.get("/admin", auth, roleGuard("ADMIN"), dashboardController.adminPanel);
router.get("/profile", auth, dashboardController.getProfile);

router.put("/admin/change-role", auth, roleGuard("ADMIN"), dashboardController.adminChangeRole);
router.post("/admin/ban", auth, roleGuard("ADMIN"), dashboardController.adminBanUser);
router.post("/profile", auth, upload.single("avatar"), dashboardController.updateProfile);

router.post("/admin/unban", auth, roleGuard("ADMIN"), dashboardController.adminUnbanUser);

router.get("/teacher", auth, roleGuard("TEACHER"), dashboardController.teacherPanel);


router.get("/author", auth, roleGuard("AUTHOR"), dashboardController.authorPanel);


router.get("/user", auth, roleGuard("USER"), dashboardController.userPanel);


router.get("/", auth, dashboardController.panel);

module.exports = router;