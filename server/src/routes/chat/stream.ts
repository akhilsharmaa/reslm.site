import express, { Request, Response } from 'express';
import { generateAuthToken } from "../../utils/generateJwtToken";  
import { chatOpenAi } from '../../services/openai_chat';
import prisma from "../../database/prisma"; 
import { ChatType } from '@prisma/client';
import { SSEPRIVATEKEY } from '../../config';
import jwt from 'jsonwebtoken';
import { decodeSseUrl } from '../../utils/decodeSseUrl';

const router = express.Router();

router.get("/stream", async (req: Request, res: Response): Promise<void> => {  
     
        // Set headers to keep the connection alive and tell the client we're sending event-stream data
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive'); 

        const token = req.query.token as string | undefined;
            if (!token){res.send("No Token provided");return;}

        const decoded:any = await decodeSseUrl(res, token);
        const session_id: number = decoded.session_id;

        const latestChat = await prisma.chat.findFirst({
            where: {session_id}, 
            orderBy: {created_at: 'desc' }
        });

        if(!latestChat || latestChat.type === ChatType.AI)
            {res.send(404).send("No user message found"); return;} 
        
        try { 

            const responseStream = await chatOpenAi.stream([
                ['human', latestChat.text]
            ]) 
            
            let fullContent = ""; 
            for await (const chunk of responseStream) {
                res.write(`data: ${chunk.content}\n\n`);  
                fullContent += chunk.content; 
            } 

            await prisma.chat.create({
                data: {
                    text: fullContent, 
                    session_id: session_id, 
                    type: ChatType.AI 
                }
            });

            // When client closes connection, stop sending events
            req.on('close', () => {
                // clearInterval(intervalId);
                res.end();
            });
            
        } catch (error) {
            res.status(500).send("Something went wrong"); 
        } 
}); 

export default router;