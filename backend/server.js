const app = require("./app");
const connectDB = require("./config/database");
const dotenv = require("dotenv");

// Configs
dotenv.config({ path: "backend/config/config.env" });
connectDB();

// handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err.stack}`);
    console.log("Shutting down the server due to uncaught exceptions");
    process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
    console.log(
        `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
    );
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down the server due to unhandled promises");
    server.close(() => {
        process.exit(1);
    });
});