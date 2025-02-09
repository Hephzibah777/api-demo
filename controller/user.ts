
import Department from "../models/department";
import User from "../models/user";
import { Request,Response } from "express";
import db from "../config/db";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface userType{
  id:number,
  email:string,
  password:string,
  role:string,
  createdAt:Date,
  updatedAt:Date,
}
const secretKey = "your_secret_key";

// async function insertDepartment(req:Request, res:Response):Promise<void>{
//   try{
//     const department = Department.build({ name: req.body.name, noofEmployees: req.body.noofEmployees })
//     await department.save();
//   }
//   catch(err){
//     res.status(500).send({
//       message:"Error insertin the department",
//     })
//   }
// }

async function signup(req:Request, res:Response):Promise<void>{
  try{
   
    const role=req.body.role;
    const email=req.body.email;
    const password=req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);
    const createdAt=new Date();
    const updatedAt=new Date();

    const users = await db.sequelize.query('SELECT * FROM `Users` WHERE email= :email', {
      replacements: { email: email },
      type: QueryTypes.SELECT,
    });
     
    if(users.length!=0){
      res.status(409).send({message:"User already registered"});
      return;
    }
    
    const user = await db.sequelize.query(`INSERT INTO Users (role,email,password,createdAt,updatedAt) VALUES(:role, :email, :password, :createdAt, :updatedAt)`,
      {
      replacements: { role: role, email:email, password:hashedpassword, createdAt:createdAt, updatedAt:updatedAt},
      type:QueryTypes.INSERT,
    })
   
    res.status(200).json({message:"User registered Successfully"});
    
  }
  catch(err){
    console.log(err);
    res.status(500).send({
      message:"Error adding the user",
    })
  }
 
}

async function login(req:Request, res:Response):Promise<void>{
  try{
  const {email, password}=req.body;
  const user:userType[]=await db.sequelize.query("SELECT * FROM Users WHERE email=:email",{
    replacements:{email:email},
    type:QueryTypes.SELECT,
  })
  if(user.length==0){
    res.status(400).json({message:"User does not exist"});
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user[0].password);
  if (!isPasswordValid) {
    res.status(400).send("Invalid credentials.");
    return;
  }
  const token = jwt.sign({ userId: user[0].id, email:user[0].email, role:user[0].role }, secretKey, {
    expiresIn: "1h",
  });

 
  res.json({ token });
}
catch(error){
  res.status(500).json({ message: "Internal server error" });
}


}

async function getAllusers(req:Request, res:Response):Promise<void>{
  try{
    const users = await db.sequelize.query('SELECT * FROM `Users`', {
      type: QueryTypes.SELECT,
    });
    
    res.status(200).send(users);
  }
  catch(err){
    res.status(500).send({
      message:"Error insertin the department",
    })
  }

}

async function getselecteduser(req:Request, res:Response):Promise<void>{
  try{
    const value=req.params.designation;
    const users = await db.sequelize.query('SELECT * FROM `Users` WHERE designation = :designation', {
      replacements: { designation: value },
      type: QueryTypes.SELECT,
    });
    res.send(users);
  }
  catch(err){
    res.status(500).send({
      message:"Error getting the user",
    })
  }
}

async function getuser(req:Request, res:Response):Promise<void>{
  try{
    console.log(req.params);
    const userId=req.params.userId;
    const users = await db.sequelize.query('SELECT * FROM `Users` WHERE id = :userId', {
      replacements: { userId: userId },
      type: QueryTypes.SELECT,
    });
    res.send(users);
  }
  catch(err){
    res.status(500).send({
      message:"Error getting the user",
    })
  }
}

async function updateuser(req:Request, res:Response):Promise<void>{
  try{
    const userId=req.body.id;
    const designationvalue=req.body.designation;
    const emailvalue=req.body.email;
    const passwordvalue=req.body.password;
    if(!userId){
      res.send({message:"Content cannot be empty"});
      return;
    }
    const users = await db.sequelize.query('SELECT * FROM `Users` WHERE id= :userId', {
      replacements: { userId: userId },
      type: QueryTypes.SELECT,
    });
     
    if(users.length==0){
      res.send({message:"User not registered"});
      return;
    }

    const result = await db.sequelize.query('UPDATE `Users` SET designation= :designationvalue, email = :emailvalue, password = :passwordvalue WHERE id = :userId', {
      replacements: { userId:userId, designationvalue:designationvalue, emailvalue:emailvalue, passwordvalue:passwordvalue },
      type: QueryTypes.UPDATE
    });
    res.status(200).json({message:"Successfully Updated the user"});
  }
  catch(err){
    res.status(500).send({
      message:"Error updating the department",
    })
  }
}

async function deleteuser(req:Request, res:Response):Promise<void>{
  try{
    const userId=req.params.userId;
    const users = await db.sequelize.query('DELETE FROM `Users` WHERE id = :userId', {
      replacements: { userId: userId },
      type: QueryTypes.DELETE,
    });
    res.status(200).json({message:"Successfully Deleted the user"});
  }
  catch(err){
    res.status(500).send({
      message:"Error deleting the user",
    })
  }
}











const usercontroller={
    signup:signup,
    login:login,
    getAllusers:getAllusers,
    getselecteduser:getselecteduser,
    updateuser:updateuser,
    deleteuser:deleteuser,
    getuser:getuser,
}

export default usercontroller;