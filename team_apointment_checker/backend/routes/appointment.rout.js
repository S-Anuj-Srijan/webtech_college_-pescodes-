import express from "express";
import {getappointments,deleteappointment,updateappointment,addappointment} from "../controller/appointment.controller.js";
const router = express.Router();

router.get("/",getappointments);
router.post("/",addappointment);
router.put("/:id",updateappointment);
console.log(process.env.MONGO_URI);
router.delete("/:id",deleteappointment);
export default router;
