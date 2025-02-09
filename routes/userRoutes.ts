import express from "express";
import authenticateToken from "../middleware/auth";
import usercontroller from "../controller/user";
import deptcontroller from "../controller/department";
import doctorcontroller from "../controller/doctor";
const router=express.Router();

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *  title:User,Department,Doctor API
 *  description:API endpoints for managing users, departments, doctors
 *  version:1.0.0
 * servers:
 *  url:http://localhost:3000
 *  description:Local Development Server
 * paths:
 *  /users:
 *      post:
 *          summary: Registers new user in the system.
 *          description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *          content:
 *            application/json:
 *              schema:
 *                type:object
 *                properties:
 *                  
*/
router.post("/users", (req,res)=>{
    usercontroller.signup(req,res);
})
// router.post("/login", (req,res)=>{
//     usercontroller.login(req,res);
// })

// router.get("/users", authenticateToken, usercontroller.getAllusers);

// router.get("/users/designation/:designation", (req,res)=>{
//     usercontroller.getselecteduser(req,res);

// })

// router.put("/users", (req,res)=>{
//     usercontroller.updateuser(req,res);
// })

// router.delete("/users/:userId", (req,res)=>{
//     usercontroller.deleteuser(req,res);
// })
// router.get("/users/:userId", (req,res)=>{
//     usercontroller.getuser(req,res);
// })


// router.post("/departments", deptcontroller.adddept);
// router.get("/departments", deptcontroller.getAlldepartments)
// router.get("/departments/:deptId", deptcontroller.getselecteddept);
// router.patch("/departments/:deptId", deptcontroller.updateDept);
// router.post("/doctors", doctorcontroller.addDoctor);
// router.get("/doctors", doctorcontroller.getAlldoctors);
// router.get("/doctors/:doctorId", doctorcontroller.getselecteddoctor);


export default router;