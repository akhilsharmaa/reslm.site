import express, { Request, Response } from 'express';
import { generateAuthToken } from "../../utils/generateJwtToken";
import prisma from "../../database/prisma";
import { z } from "zod"; 
import { ChatType } from '../../models/chat';
import AuthenticatedRequest from '../../interface/authReq'
import authenticate from "../../middleware/authenticate.middleware"  
import { generateSseToken } from '../../utils/generateSseToken';

const router = express.Router();

const newChat = z.object({  
    text: z.string().max(1000), 
    session_id: z.number(), 
}); 

router.post("/new", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {  
    
    const { text, session_id } = newChat.parse(req.body); 
    
    try { 
        // so here what we are just create a sse token on the basis on the session 
        const session_db = await prisma.session.findFirst({
            where: {
                user_id: Number(req.user._id), 
                id: Number(req.body.session_id), 
            }
        })
            if(!session_db)
                res.status(401).send("You are not authorized to see or session doesn't exist.")

    } catch (error) {         
        console.error(error); 
        res.status(500).send(`${error}`);  
    }

    try {

        const chat_db = await prisma.chat.create({
            data: {
                text: text, 
                session_id: session_id,
                type: ChatType.HUMAN 
            }
        }); 
        
        // const sseToken = await generateSseToken(Number(req.user._id), session_id); 
        res.status(200).send(chat_db); 

    }catch(err) { 
        res.status(500).send("Failed to insert the chat."); 
    } 
}); 

export default router;