
import Department from "../models/department";
import User from "../models/user";
import { Request,Response } from "express";
import sequelize from "../config/db";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt";



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

async function insertUser(req:Request, res:Response):Promise<void>{
  try{
   
    const designation=req.body.designation;
    const email=req.body.email;
    const password=req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);
    const createdAt=new Date();
    const updatedAt=new Date();

    const users = await sequelize.query('SELECT * FROM `Users` WHERE email= :email', {
      replacements: { email: email },
      type: QueryTypes.SELECT,
    });
     
    if(users.length!=0){
      res.send({message:"User already registered"});
      return;
    }
    
    const user = await sequelize.query(`INSERT INTO Users (designation,email,password,createdAt,updatedAt) VALUES(:designation, :email, :password, :createdAt, :updatedAt)`,
      {
      replacements: { designation: designation, email:email, password:hashedpassword, createdAt:createdAt, updatedAt:updatedAt},
      type:QueryTypes.INSERT,
    })
   
    res.status(200).json({message:"Successfully Added the user"});
    
  }
  catch(err){
    console.log(err);
    res.status(500).send({
      message:"Error inserting the user",
    })
  }
 
}

async function getAllusers(req:Request, res:Response):Promise<void>{
  try{
    const users = await sequelize.query('SELECT * FROM `Users`', {
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
    const users = await sequelize.query('SELECT * FROM `Users` WHERE designation = :designation', {
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
    const users = await sequelize.query('SELECT * FROM `Users` WHERE id = :userId', {
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
    const users = await sequelize.query('SELECT * FROM `Users` WHERE id= :userId', {
      replacements: { userId: userId },
      type: QueryTypes.SELECT,
    });
     
    if(users.length==0){
      res.send({message:"User not registered"});
      return;
    }

    const result = await sequelize.query('UPDATE `Users` SET designation= :designationvalue, email = :emailvalue, password = :passwordvalue WHERE id = :userId', {
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
    const users = await sequelize.query('DELETE FROM `Users` WHERE id = :userId', {
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











const controller={
    insertUser:insertUser,
    getAllusers:getAllusers,
    getselecteduser:getselecteduser,
    updateuser:updateuser,
    deleteuser:deleteuser,
    getuser:getuser,
}

export default controller;