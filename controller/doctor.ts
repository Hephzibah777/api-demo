import { Request,Response } from "express";
import db from "../config/db";
import { QueryTypes, Sequelize } from "sequelize";

interface doctorType{
    id:number,
    userId:number,
    name:string,
    phone:string,
    specialization:string,
    salary:string,
    yearsOfExperience:number,
    email:string,
    deptId:number,
}

async function addDoctor(req:Request,res:Response):Promise<void>{
    try{
        console.log(req.body);
    const name=req.body.name;
    const id=req.body.id;
    const phone=req.body.phone;
    const specialization=req.body.specialization;
    const salary=req.body.salary;
    const yearsOfExperience=req.body.yearsOfExperience
    const email=req.body.email;
    const deptId=req.body.deptId;
    const createdAt=new Date();
    const updatedAt=new Date();

    if(!name || !id || !phone|| !specialization || !salary || !email ||!deptId){
        res.status(400).send({message:"Content cannot be empty"});
        return;
    }

    const checkdoctor=await db.sequelize.query("SELECT * FROM Doctors where id=:id",{
        replacements:{id:id},
        type:QueryTypes.SELECT,
    })

    if(checkdoctor.length!=0){
        res.status(409).send({message:"data already exists"});
        return;
    }

    const doctor=await db.sequelize.query("INSERT INTO Doctors(userId,name, phone, specialization, salary, yearsOfExperience, email, deptId,createdAt,updatedAt) VALUES(:userId, :name,:phone,:specialization,:salary,:yearsOfExperience, :email,:deptId,:createdAt,:updatedAt)",{
        replacements:{name:name, userId:id, phone:phone, specialization:specialization, salary:salary, yearsOfExperience:yearsOfExperience, email:email, deptId:deptId, createdAt:createdAt, updatedAt:updatedAt},
        type:QueryTypes.INSERT,
    })
    res.status(200).send({message:"Data Successfully Added"});
}
catch(error){
    console.log(error);
    res.status(500).send({message:"Error adding the data"});
}
}

async function getAlldoctors(req:Request, res:Response):Promise<void>{
    try{
        const doctors=await db.sequelize.query("SELECT * FROM Doctors");
        res.send({doctors})
    }
    catch(error){
        res.status(500).json({message:"Error getting the doctors"});
    }
}

async function getselecteddoctor(req:Request, res:Response):Promise<void>{
    try{
        const doctorId=Number(req.params.doctorId);
        if(!doctorId){
            res.status(400).json({message:"Content cannot be missing"});
            return;
        }
        const doctors=await db.sequelize.query("SELECT * FROM Doctors WHERE id=:doctorId",{
            replacements:{doctorId:doctorId},
            type:QueryTypes.SELECT
        })
        if(doctors.length==0){
            res.status(400).json({message:"Doctor does not exist"})
            return;
        }
        res.send(doctors[0]);

    }
    catch(error){
        res.status(500).json({message:"Error getting the doctor"});
    }
}

async function deleteselecteddoctor(req:Request, res:Response):Promise<void>{
    try{
        const doctorId=req.params.doctorId;
        if(!doctorId){
            res.status(400).json({message:"Content cannot be empty"});
            return;
        }
        const doctor=await db.sequelize.query("DELETE from Doctors WHERE id=:doctorId",{
            replacements:{doctorId:doctorId},
            type:QueryTypes.DELETE,
        })
        res.status(200).json({message:"Doctor details deleted successfully"});
    }
    catch(error){
        res.status(500).json({message:"Error deleting the doctor"});
    }
}

async function updateDoctor(req:Request, res:Response):Promise<void>{
    const body=req.body;
    const doctorId=req.params.doctorId;
    const updatedAt=new Date();
    let col="";
    Object.keys(body).forEach(key=>{
        col=col+`${key}`+"="+":"+`${key}`+",";
    })
    console.log(col);
    const doctors:doctorType[]=await db.sequelize.query("SELECT * from Doctors where id=:doctorId",{
        replacements:{doctorId:doctorId},
        type:QueryTypes.SELECT,
    })
    const query="UPDATE `Doctors` SET" + " " +col + "updatedAt:=updatedAt";
    if(doctors.length==0){
        res.status(404).json({message:"Department does not exist"});
        return;
    }
  
    const result = await db.sequelize.query(query, {
        replacements: { ...body, updatedAt:updatedAt},
        type: QueryTypes.UPDATE
      });
    res.status(200).json({message:"Successfully Updated the department"});
    
 } 



const doctorcontroller={
    addDoctor:addDoctor,
    getAlldoctors:getAlldoctors,
    getselecteddoctor:getselecteddoctor,
    deleteselecteddoctor:deleteselecteddoctor,
    updateDoctor:updateDoctor
}
export default doctorcontroller;
