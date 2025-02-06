import db from "../config/db";
import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Department = sequelize.define(
    'Department',
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
        unique:true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noofEmployees: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });

export default Department;

