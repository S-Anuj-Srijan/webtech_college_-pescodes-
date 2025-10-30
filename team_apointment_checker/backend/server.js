import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import appointmentRoutes from "./routes/appointment.rout.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ 1. Enable JSON and CORS for frontend access
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // your React app
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ 2. Connect routes
app.use("/appointments", appointmentRoutes);

// ✅ 3. Start the server and connect DB
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
