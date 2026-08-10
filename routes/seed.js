const express = require("express");
const router = express.Router();
const { execSync } = require("child_process");

router.get("/", async (req, res) => {
    try {
        console.log("🌱 Seeding started...");
        
        execSync("node seeders/categorySeeder.js", { stdio: "inherit" });
        execSync("node seeders/userSeeder.js", { stdio: "inherit" });
        execSync("node seeders/courseSeeder.js", { stdio: "inherit" });
        execSync("node seeders/articleSeeder.js", { stdio: "inherit" });
        execSync("node seeders/sessionSeeder.js", { stdio: "inherit" });
        
        console.log("✅ Seeding completed!");
        res.json({ success: true, message: "Seeding completed!" });
    } catch (error) {
        console.error("❌ Seeding error:", error.message);
        res.json({ success: false, error: error.message });
    }
});

module.exports = router;
