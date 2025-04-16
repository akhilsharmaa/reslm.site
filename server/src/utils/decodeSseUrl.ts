import { Request, Response } from "express";
import { SSEPRIVATEKEY } from "../config";
import jwt from "jsonwebtoken";

export const decodeSseUrl = async (res: Response, token: string) => {
    try {
        return jwt.verify(token, SSEPRIVATEKEY);  
    } catch (error) {
        res.status(401).send("Invalid Token provided!")
    }
}