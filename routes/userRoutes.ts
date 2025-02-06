import express from "express";
import controller from "../controller/userController";
const router=express.Router();



// router.post("/departments", (req,res)=>{
//     controller.insertDepartment(req,res);
//     res.status(200).json({message:"Successfully added the user"})
// })


router.post("/users", (req,res)=>{
    controller.insertUser(req,res);
})

router.get("/users", (req,res)=>{
    controller.getAllusers(req,res);
})

router.get("/users/designation/:designation", (req,res)=>{
    controller.getselecteduser(req,res);

})

router.put("/users", (req,res)=>{
    controller.updateuser(req,res);
})

router.delete("/users/:userId", (req,res)=>{
    controller.deleteuser(req,res);
})
router.get("/users/:userId", (req,res)=>{
    controller.getuser(req,res);
})


export default router;