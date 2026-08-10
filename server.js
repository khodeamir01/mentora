const dotenv = require("dotenv");
const mongoose = require("mongoose");

const isProductionMode = process.env.NODE_ENV === "production";

if (!isProductionMode) dotenv.config({ quiet: true });

const app = require("./app");

async function connectToDB() {
    try {
        // دیباگ
        console.log("Connecting to MongoDB...");
        console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected : ${mongoose.connection.host}`);

    } catch (error) {
        console.log(`Error in mongoose connection : ${error.message}`);
        process.exit(1);
    }
}

async function startServer() {
    const port = +process.env.PORT || 4000;

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

async function run() {
    await connectToDB();
    await startServer();
}

run();
