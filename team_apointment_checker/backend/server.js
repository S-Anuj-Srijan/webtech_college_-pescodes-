import express from 'express';
import {connectDB} from './config/db.js'
import dotenv from 'dotenv';

import appointmentRoutes from './routes/appointment.rout.js'
dotenv.config();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.use("/appointments",appointmentRoutes);
app.listen(5000,()=>{
    connectDB();
    console.log("serve is  on 5k http://localhost:5000");
});

//