import jwt from "jsonwebtoken"; 
import { SSEPRIVATEKEY } from '../config'

export const generateSseToken = async (_id: number, session_id: number) => {  

    const sseToken = await jwt.sign(
        {
            _id: _id, 
            session_id: session_id 
        },
        SSEPRIVATEKEY,
        { expiresIn: "30s" }
    );

    return sseToken;  
};