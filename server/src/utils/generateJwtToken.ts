import jwt from "jsonwebtoken"; 
import { JWTPRIVATEKEY } from '../config'

export const generateAuthToken = (id: number) => { 
    const token =  jwt.sign({ _id: String(id) }, JWTPRIVATEKEY).toString();;
    return token;  
};