import express, { Request, Response } from 'express';
import prisma from "../../database/prisma";
import { z } from "zod"; 
import AuthenticatedRequest from '../../interface/authReq'
import authenticate from "../../middleware/authenticate.middleware"  
import ChatBody from '../../models/chat';
import logger from '../../utils/logger';

const router = express.Router();

const newChat = z.object({   
    session_id: z.number(), 
}); 

router.post("/all", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {  
    
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
        logger.error(error); 
        res.status(500).send(error);  
    }

    try {
        
        const chats =  await prisma.chat.findMany({
            where: { session_id: session_id, }, 
            include: {
                chunks: true,
            },
        }); 

        res.status(200).json(chats);
    } catch (error) {
        logger.error(error);
        res.status(500).send("Failed to insert the chat.");
    }
 
}); 

export default router;