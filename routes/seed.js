const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        console.log("🌱 Seeding started...");

        require("../seeders/categorySeeder");
        require("../seeders/userSeeder");
        require("../seeders/courseSeeder");
        require("../seeders/articleSeeder");
        require("../seeders/sessionSeeder");

        console.log("✅ Seeding done");
        res.json({ success: true, message: "Seeding completed!" });
    } catch (error) {
        console.error("❌ Error:", error.message);
        res.json({ success: false, error: error.message });
    }
});

module.exports = router;
