import mongoose from "mongoose"; // To make the connection
import dotenv from "dotenv"; // Get the environment variable

dotenv.config(); // Invokes the configuration

const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URL; // Use MONGO_URL here

        if (!uri) {
            throw new Error("MONGO_URL is not defined in the environment variables.");
        }

        await mongoose.connect(uri); // Connect to MongoDB
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB;