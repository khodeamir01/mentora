const dotenv = require("dotenv");
const mongoose = require("mongoose");

const isProductionMode = process.env.NODE_ENV === "production";

if (!isProductionMode) dotenv.config({ quiet: true });

const app = require("./app");

async function connectToDB() {
    try {
        console.log("Connecting to MongoDB...");

        console.log(
            "Mongo URI:",
            process.env.MONGO_URI?.replace(
                /\/\/([^:]+):([^@]+)@/,
                "//$1:****@"
            )
        );

        await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected : ${mongoose.connection.host}`);

    } catch (error) {
        console.log("Mongo error:", error);
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
