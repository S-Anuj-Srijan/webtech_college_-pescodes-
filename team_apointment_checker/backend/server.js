import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js'
import Appointment from './models/apointment.model.js';
dotenv.config();
const app = express();
app.use(express.json());
app.post("/appointments",async (req,res)=>{
    const appointment = req.body;
    if (!appointment.name||!appointment.time||!appointment.doctorname||!appointment.price){
        return res.status(400).json({success:false,message:"please provide all fields"});
    }
    const newappointment=new Appointment(appointment);
    try {
        await newappointment.save();
        res.status(201).json({sucess:true,data:newappointment});
    } catch (error) {
        console.error("Errorrr",error.message);
        res.status(500).json({sucess:false,message:"server error"});
        
    }
});
console.log(process.env.MONGO_URI);
app.listen(5000,()=>{
    connectDB();
    console.log("serve is  on 5k http://localhost:5000");
});

//