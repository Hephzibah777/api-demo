
import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db";

const User = db.sequelize.define(
    'User',
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
        unique:true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue:Sequelize.fn("now"),
        allowNull: false,
      },
    
    });

export default User;

