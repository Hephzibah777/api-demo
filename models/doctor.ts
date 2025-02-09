
import { DataTypes } from "sequelize";
import db from "../config/db";
import User from "./user";
import Department from "./department";

const Doctor = db.sequelize.define(
    'Doctor',
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
        unique:true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
        references:{
          model:User,
          key:"id"
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      yearsOfExperience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deptId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:Department,
          key:"id"
        }
      },
    });
Doctor.belongsTo(User,{foreignKey:'userId'});
Doctor.belongsTo(Department,{foreignKey:'deptId'});

export default Doctor;

