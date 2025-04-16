import express, { Request, Response } from 'express';
import { generateAuthToken } from "../../utils/generateJwtToken";
import prisma from "../../database/prisma"; 

const router = express.Router();

router.get("/sse", async (req: Request, res: Response): Promise<void> => {  
    
    const sseToken = req;  
    console.log(req);
    
    
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
        res.status(500).send(`${error}`);  
    }

    try {
 
        // const sseToken = await generateSseToken(Number(req.user._id), session_id); 
        res.status(200).send("asdasd"); 

    }catch(err) { 
        res.status(500).send("Failed to insert the chat."); 
    } 
}); 

export default router;