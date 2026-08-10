const express = require("express");
const router = express.Router();

const seedCategories = require("../seeders/categorySeeder");
const seedUsers = require("../seeders/userSeeder");
const seedCourses = require("../seeders/courseSeeder");
const seedSessions = require("../seeders/sessionSeeder");
const seedArticles = require("../seeders/articleSeeder");

router.get("/", async (req, res) => {
    try {
        await seedCategories();
        await seedUsers();
        await seedCourses();
        await seedSessions();
        await seedArticles();

        res.json({ success: true, message: "All seeders completed!" });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

module.exports = router;
