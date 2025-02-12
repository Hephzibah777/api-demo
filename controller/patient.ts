import { Request,Response } from "express";
import db from "../config/db";
import { QueryTypes } from "sequelize";

interface patientType{
    id:number,
    name:string,
    phone:string,
    gender:string,
    address:string,
}

async function addPatient(req:Request, res:Response):Promise<void>{
 try{
    const {name, phone, gender, age, address}=req.body;
    const createdAt=new Date();
    const updatedAt=new Date();
    if(!name || !phone || !gender || !address){
        req.body.json({message:"Content cannot be empty"});
        return;
    }
    const patient=await db.sequelize.query(`INSERT INTO Patients(name, phone, gender, age, address, createdAt, updatedAt) VALUES(:name, :phone, :gender, :age, :address, :createdAt, :updatedAt)`,{
        replacements:{name:name, phone:phone, gender:gender,age:age, address:address, createdAt:createdAt, updatedAt:updatedAt},
        type:QueryTypes.INSERT,
    })

    res.status(200).json({message:"Patient successfully added"});

 }
 catch(error){
    res.status(500).json({message:"Error adding patient details"});
 }
}

const patientController={
    addPatient:addPatient,
}

export default patientController;