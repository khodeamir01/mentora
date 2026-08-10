const mongoose = require("mongoose");
const Category = require("../models/Category");

const seedCategories = async () => {
    try {
        await Category.deleteMany({});
        console.log("🧹 Old categories cleared");

        const categories = [
            { title: "Frontend", href: "frontend" },
            { title: "Backend", href: "backend" },
            { title: "Security", href: "security" },
            { title: "Mobile App", href: "mobile-app" },
            { title: "Network", href: "network" },
            { title: "DevOps", href: "devops" },
            { title: "Desktop", href: "desktop" },
        ];

        await Category.insertMany(categories);
        console.log("✅ Categories created");

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
};

module.exports = seedCategories;
