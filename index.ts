import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import  sequelize, { dbConnect } from "./config/db";  // Import the database connection
import userRoutes from "./routes/userRoutes"
import { Sequelize } from "sequelize";
dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200).json({message:"asd"})
})

// Routes
app.use("/api", userRoutes);

dbConnect();
app.listen(3000,()=>{
    console.log("App listens at 3000")
})

sequelize.sync();

