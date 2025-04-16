import express, { Request, Response } from 'express'; 
import AuthenticatedRequest from '../../interface/authReq'
import authenticate from "../../middleware/authenticate.middleware" 
import prisma from '../../database/prisma'; 
import jwt from "jsonwebtoken"; 
import { SSEPRIVATEKEY } from '../../config'
import z from "zod"
import { generateSseToken } from '../../utils/generateSseToken';

const router = express.Router();  

const newChat = z.object({   
    session_id: z.number(), 
});

router.post("/url", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {  

    const { session_id } = newChat.parse(req.body); 

    try { 
        // so here what we are just create a sse token on the basis on the session 
        const session_db = await prisma.session.findFirst({
            where: {
                user_id: Number(req.user._id), 
                id: Number(req.body.session_id), 
            }
        })

        if(!session_db)res.status(401).send("You are not authorized to see or session doesn't exist.")

    } catch (error) {         
        console.error(error); 
        res.status(500).send(error);  
    }

    try {  
        const sseToken =  generateSseToken(req.user._id, session_id); 
        res.status(200).send(sseToken);  

    } catch (error) {
        console.error(error); 
        res.status(500).send("Something went wrong! please try again later. ");
    }
});

export default router;
