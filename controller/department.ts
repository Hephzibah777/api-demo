import { Request,Response } from "express";
import db from "../config/db";
import { QueryTypes } from "sequelize";

interface departmentType{
    id:number,
    name:string,
    noofEmployees:number,
    createdAt:Date,
    updatedAt:Date,
}
async function adddept(req:Request, res:Response):Promise<void>{
    try{
        console.log(req);
    const name=req.body.name;
    const noofEmployees=req.body.noofEmployees;
    const createdAt=new Date();
    const updatedAt=new Date();

    if(!name || !noofEmployees){
        res.status(400).send({message:"Content cannot be empty"});
        return;
    }

    const checkdept=await db.sequelize.query("SELECT * FROM Departments WHERE name=:name",{
        replacements:{name:name},
        type:QueryTypes.SELECT,
    })

    if(checkdept.length!=0){
        res.status(409).send({message:"Department already exists"});
        return;
    }

    const dept=await db.sequelize.query(`INSERT INTO Departments(name, noofEmployees, createdAt, updatedAt) VALUES(:name, :noofEmployees, :createdAt, :updatedAt)`,{
        replacements:{name:name, noofEmployees:noofEmployees, createdAt:createdAt, updatedAt:updatedAt},
        type:QueryTypes.INSERT,
    })

    res.status(200).send({message:"Successfully Added the Data"});
    }
    catch(error){
        console.log(error);
        res.status(500).send({message:"Error adding the data"});
    }
}

async function getAlldepartments(req:Request, res:Response):Promise<void>{
    try{
      const depts = await db.sequelize.query('SELECT * FROM `Departments`', {
        type: QueryTypes.SELECT,
      });
      
      res.status(200).send(depts);
    }
    catch(err){
      res.status(500).send({
        message:"Error getting the departments",
      })
    }
  
  }

 async function getselecteddept(req:Request,res:Response){
    try{
    const deptId=Number(req.params.deptId);
    if(!deptId){
        res.status(400).json({message:"Content cannot be missing"});
    }
    const dept=await db.sequelize.query("Select * from Departments where id=:deptId",{
        replacements:{deptId:deptId},
        type:QueryTypes.SELECT,
    })
    if(dept.length==0){
        res.status(400).json({message:"Department does not exist"});
        return;
    }
    res.send(dept);
    }
    catch(error){
        
    }

 }

 async function updateDept(req:Request, res:Response):Promise<void>{
    const body=req.body;
    const deptId=req.params.deptId;
    const updatedAt=new Date();

    const depts:departmentType[]=await db.sequelize.query("SELECT * from Departments where id=:deptId",{
        replacements:{deptId:deptId},
        type:QueryTypes.SELECT,
    })
    if(depts.length==0){
        res.status(404).json({message:"Department does not exist"});
        return;
    }
    const dept={...depts[0], ...body};
    console.log(dept);
    const result = await db.sequelize.query('UPDATE `Departments` SET id=:deptId, name=:name, noofEmployees=:noofEmployees, updatedAt=:updatedAt', {
        replacements: { deptId:dept.id, name:dept.name, noofEmployees:dept.noofEmployees, updatedAt:updatedAt},
        type: QueryTypes.UPDATE
      });
    res.status(200).json({message:"Successfully Updated the department"});
    
 }  



const deptcontroller={
    adddept:adddept,
    getAlldepartments:getAlldepartments,
    getselecteddept:getselecteddept,
    updateDept:updateDept,
}
export default deptcontroller;