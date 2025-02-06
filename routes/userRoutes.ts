import express from "express";
import controller from "../controller/user";
const router=express.Router();

router.post("/departments/new", (req,res)=>{
    controller.createDepartment(req,res);
})

router.post("/departments", (req,res)=>{
    console.log(req)
    controller.insertDepartment(req,res);
    res.status(200).json({message:"inserted"})
})

export default router;