

import express from "express";
import authenticateToken from "../middleware/auth";
import usercontroller from "../controller/user";
import deptcontroller from "../controller/department";
import doctorcontroller from "../controller/doctor";
import patientController from "../controller/patient";
import roleCheck from "../middleware/role";
const router = express.Router();

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: User, Department, Doctor API
 *   description: API endpoints for managing users, departments, and doctors
 *   version: 1.0.0
 * servers:
 *   - url: http://localhost:3000
 *     description: Local Development Server
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * paths:
 *   /users:
 *     post:
 *       summary: Register a new user
 *       description: Sign Up a new user
 *       requestBody:
 *         required: true  
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string              
 *                 role:
 *                   type: string 
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       responses:
 *         200:
 *           description: User created successfully
 *     get:
 *       summary: Get all users
 *       description: Retrieves all users. Requires authentication
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Returns array of users
 *   /users/designation/{designation}:
 *     get:
 *       summary: Get users by designation
 *       description: Retrieves all users with a specific designation. Requires authentication
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: designation
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Users retrieved successfully
 *   /login:
 *     post:
 *       summary: Login user
 *       description: Authenticates the user and returns a token
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string 
 *       responses:
 *         200:
 *           description: User logged in successfully
 *         400:
 *           description: User does not exist
 *   /users/{userId}:
 *     get:
 *       summary: Get user by ID
 *       description: Retrieves user details by ID
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: userId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: User details retrieved
 *     delete:
 *       summary: Delete user
 *       description: Deletes a user by ID
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: userId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: User deleted successfully
 *   /departments:
 *     post:
 *       summary: Add a new department
 *       description: Creates a new department
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *       responses:
 *         201:
 *           description: Department created successfully
 *     get:
 *       summary: Get all departments
 *       description: Retrieves all departments
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of departments
 *   /departments/{deptId}:
 *     get:
 *       summary: Get department by ID
 *       description: Retrieves department details by ID
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: deptId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Department details retrieved
 *     patch:
 *       summary: Update department
 *       description: Updates department details by ID
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: deptId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *       responses:
 *         200:
 *           description: Department updated successfully
 *   /doctors:
 *     post:
 *       summary: Add a new doctor
 *       description: Registers a new doctor
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 specialization:
 *                   type: string
 *       responses:
 *         201:
 *           description: Doctor added successfully
 *     get:
 *       summary: Get all doctors
 *       description: Retrieves all doctors
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of doctors
 *   /doctors/{doctorId}:
 *     get:
 *       summary: Get doctor by ID
 *       description: Retrieves doctor details by ID
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: doctorId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Doctor details retrieved
 *     delete:
 *       summary: Deletes doctor by id
 *       description: Deleted selected doctor by id
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: doctorId
 *           in: path
 *           required: true
 *           schema:
 *             type:string
 *       responses:
 *         200:
 *           description: Doctor details deleted successfully
 *   /patients:
 *     post:
 *       summary: Adds a new patient
 *       description: Creates a new patient
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 age:
 *                   type: number
 *                 gender:
 *                   type: string
 *                 address:
 *                   type: string
 *                 
 *       responses:
 *         201:
 *           description: Department created successfully   
 */

router.post("/users", (req, res) => usercontroller.signup(req, res));
router.post("/login", (req, res) => usercontroller.login(req, res));
router.get("/users", authenticateToken, roleCheck.roleCheckAdmin, usercontroller.getAllusers);
router.get("/users/designation/:designation", roleCheck.roleCheckAdmin, authenticateToken, usercontroller.getselecteduser);
router.get("/users/:userId", authenticateToken, roleCheck.roleCheckAdmin, usercontroller.getuser);
router.delete("/users/:userId", authenticateToken, roleCheck.roleCheckAdmin, usercontroller.deleteuser);
router.post("/departments",authenticateToken, roleCheck.roleCheckAdmin, deptcontroller.adddept);
router.get("/departments",authenticateToken, deptcontroller.getAlldepartments);
router.get("/departments/:deptId", authenticateToken,deptcontroller.getselecteddept);
router.patch("/departments/:deptId",authenticateToken, deptcontroller.updateDept);
router.post("/doctors",authenticateToken, doctorcontroller.addDoctor);
router.get("/doctors", authenticateToken,doctorcontroller.getAlldoctors);
router.get("/doctors/:doctorId",authenticateToken, doctorcontroller.getselecteddoctor);
router.delete("/doctors/:doctorId", authenticateToken, doctorcontroller.deleteselecteddoctor);
router.patch("/doctors/:doctorId", authenticateToken, doctorcontroller.updateDoctor);
router.post("/patients", authenticateToken, patientController.addPatient);

export default router;