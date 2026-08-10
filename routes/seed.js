const express = require("express");
const router = express.Router();

const seedCategories = require("../seeders/categorySeeder");
const seedUsers = require("../seeders/userSeeder");
const seedCourses = require("../seeders/courseSeeder");
const seedSessions = require("../seeders/sessionSeeder");
const seedArticles = require("../seeders/articleSeeder");
const seedcomments = require("../seeders/commentSeeder");

router.get("/", async (req, res) => {
    try {
        console.log("🌱 Starting seed...");
        
        await seedCategories();
        console.log("✅ Categories done");
        
        await seedUsers();
        console.log("✅ Users done");
        
        await seedCourses();
        console.log("✅ Courses done");
        
        await seedSessions();
        console.log("✅ Sessions done");
        
        await seedArticles();
        console.log("✅ Articles done");

        await seedcomments();
        console.log("✅ Comments done");

        res.json({ success: true, message: "All done!" });
    } catch (error) {
        console.error("❌ Error:", error.message);
        res.json({ success: false, error: error.message });
    }
});

module.exports = router;
