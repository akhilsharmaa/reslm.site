import express, { Request, Response } from 'express';
import { generateAuthToken } from "../../utils/generateJwtToken";
import prisma from "../../database/prisma";
import { number, z } from "zod"; 
import { ChatType, Chunk } from '../../models/chat';
import AuthenticatedRequest from '../../interface/authReq'
import authenticate from "../../middleware/authenticate.middleware"   
import { createEmbedding } from '../../utils/createEmbedding';
import logger from '../../utils/logger';

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
        logger.error(error); 
        res.status(500).send(`${error}`);  
    } 

    try {

        const generatedEmbeddings = await createEmbedding([text]); 
        const formattedVector = `[${generatedEmbeddings.join(',')}]`;  

        const embeddings_db:any = await prisma.$queryRawUnsafe(`
            SELECT "id", "text"::text
            FROM "Embedding"
            ORDER BY "embedding" <=> $1::vector
            LIMIT 5
        `, formattedVector);


        const chat_db = await prisma.chat.create({
            data: {
                text: text, 
                session_id: session_id,
                type: ChatType.HUMAN, 
            }
        }); 

        const similarChunks:Chunk[] = embeddings_db.map((embedding:any) => {
            return { 
                text: embedding.text,
                embedding_id: embedding.id, 
                chat_id: chat_db.id
            }
        }); 

        await prisma.chatChunk.createMany({
            data: similarChunks,
        });

        const chunks = await prisma.chatChunk.findMany({
            where: {chat_id: chat_db.id}
        })

        res.status(200).send({
            ...chat_db, 
            chunks: [...chunks]
        });

    }catch(err) { 
        console.log(err);
        res.status(500).send("Failed to insert the chat."); 
    } 
}); 

export default router;