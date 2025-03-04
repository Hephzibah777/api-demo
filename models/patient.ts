
import { DataTypes } from "sequelize";
import db from "../config/db";
import User from "./user";


const Patient = db.sequelize.define(
    'Patient',
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull: false,
        unique:true,
        autoIncrement:true,
      
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
    });


export default Patient;

