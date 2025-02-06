import db from "../config/db";
import Department from "../models/departments";
import { Request,Response } from "express";

function createDepartment(req:Request,res:Response){
    const {name}=req.body;
    if (!name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }

  const department= {
    name: req.body.name,
    noofEmployees: req.body.noofEmployees,
  };

  Department.create(department)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Department Table."
    });
  });  
}

async function insertDepartment(req:Request, res:Response){
    const department = Department.build({ name: req.body.name, noofEmployees: req.body.noofEmployees })
    await department.save();
}

const controller={
    createDepartment:createDepartment,
    insertDepartment:insertDepartment,
}

export default controller;