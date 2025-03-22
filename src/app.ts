import express from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";

const app = express();

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware to log errors
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Error:", err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes);

export default app; // ✅ Export app without starting a server
