// seeders/categorySeeder.js
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

        const created = await Category.insertMany(categories);
        console.log(`✅ ${created.length} categories created`);
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mentora").then(seedCategories);