// ------------------------------
//  Backend Entry Point
// ------------------------------
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import appointmentRoutes from "./routes/appointment.rout.js";

// ------------------------------
//  Load environment variables
// ------------------------------
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ------------------------------
//  Middleware
// ------------------------------
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin (React Vite default)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ------------------------------
//  Routes
// ------------------------------
app.use("/appointments", appointmentRoutes);

// ------------------------------
//  Database Connection + Server Start
// ------------------------------
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB first
    console.log("✅ MongoDB connection established successfully.");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    console.error("💡 Check if your IP is whitelisted and credentials are correct.");
    process.exit(1); // Exit process if DB connection fails
  }
};

startServer();
