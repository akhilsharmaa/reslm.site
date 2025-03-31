import express, { Request, Response, NextFunction} from 'express'; 
import jwt from 'jsonwebtoken'; 
import { JWTPRIVATEKEY } from "../config";
import AuthenticatedRequest from "../interface/authReq"

// JWT Authentication Middleware
const authenticate = (req:AuthenticatedRequest, res:Response, next:NextFunction) :void => {

  const token:string|undefined = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  try {
    if(token ){
      const decoded = jwt.verify(token, JWTPRIVATEKEY); 
      req.user = decoded;
      next();  
    }else { 
      res.status(401).send("Access denied! no token provided."); 
    }

  } catch (error) {
    res.status(401).send("Invalid token");  
  }
};

export default authenticate;