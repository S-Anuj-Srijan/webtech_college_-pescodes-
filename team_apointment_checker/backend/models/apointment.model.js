import mongoose from "mongoose";
const appointmentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        require:true
    },
    doctorname:{
        type:String,
        required:true
    },
    time:{
        type:Number,
        required:true
    }
    
},{timestamps:true});

const Appointment=mongoose.model('Appointment',appointmentSchema);
export default Appointment;