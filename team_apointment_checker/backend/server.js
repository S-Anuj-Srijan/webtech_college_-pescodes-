import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js'
import Appointment from './models/apointment.model.js';
import mongoose from 'mongoose';
dotenv.config();
const app = express();
app.use(express.json());
app.get("/appointments",async (req,res)=>{
    try {
        const appointments=await Appointment.find({});
        res.status(200).json({sucess:true,data:appointments});

    } catch (error) {
        console.error("Errorrr",error.message);
        res.status(500).json({sucess:false,message:"server error"});
        
    }
});
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
app.put("/appointments/:id",async (req,res)=>{
    const {id}=req.params;
    const appointment = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)){
        console.log("Errorrr");
        return res.status(404).json({sucess:false,message:"server error"});
    }
    try {
        const updatedappointment = await Appointment.findByIdAndUpdate(id,appointment,{new:true});
        res.status(200).json({success:true,message:"done",newdata:updatedappointment});

    } catch (error) {
        res.status(500).json({sucess:false,message:"server error"});
    }
});
console.log(process.env.MONGO_URI);
app.delete("/appointments/:id",async (req,res)=>{
    const {id}=req.params;
    console.log(id);
    try {
        await Appointment.findByIdAndDelete(id);
        res.status(200).json({sucess:true,message:"appointment deleted "});
    } catch (error) {
        console.error("error",error.message);
        res.status(500).json({sucess:false,message:"deletion failed"});

    }
});
app.listen(5000,()=>{
    connectDB();
    console.log("serve is  on 5k http://localhost:5000");
});

//