import { Request, Response } from "express";
import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";
import  jwt, { JwtPayload }  from "jsonwebtoken";

const secretKey = "your_secret_key";
interface payloadType{
    userId:number,
    email:string,
    role:string,
    iat:number,
    exp:number,
}

async function roleCheckAdmin(req: Request, res: Response, next:Next):Promise<void> {
  try {
   const rtoken = req.header("Authorization");
       const token=rtoken!.replace('Bearer ',''); 
       console.log(token);
       if (!token){
          res.status(401).json({ error: "Access denied" });
          return;
       }
       const decoded = jwt.verify(token, "your_secret_key") as payloadType;
       if(decoded.role!='Admin'){
        res.status(403).json({message:"Access Denied"});
       }

    next();
  } catch (error) {
    res.status(500).json({message:"Unauthorized"});
  } 
}

const roleCheck={
    roleCheckAdmin:roleCheckAdmin,
}

export default roleCheck;
