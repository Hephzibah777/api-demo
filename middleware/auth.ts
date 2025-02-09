import { Request, Response } from "express";
import  jwt, { JwtPayload }  from "jsonwebtoken";
import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";

const secretKey = "your_secret_key";
interface payloadType{
    userId:number,
    email:string,
    role:string,
    iat:number,
    exp:number,
}
async function authenticateToken(req: Request, res: Response, next:Next):Promise<void> {
  try {
    const rtoken = req.header("Authorization");
    const token=rtoken!.replace('Bearer ',''); 
    console.log(token);
    if (!token){
       res.status(401).json({ error: "Access denied" });
       return;
    }
    const decoded = jwt.verify(token, "your_secret_key") as payloadType;
    console.log(decoded);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  } 
}

export default authenticateToken;
