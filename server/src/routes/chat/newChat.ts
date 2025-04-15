import express, { Request, Response } from 'express';
import { generateAuthToken } from "../../utils/generateJwtToken";
import prisma from "../../database/prisma";
import { z } from "zod";
import bcrypt from "bcrypt"; 
import { User } from '@prisma/client';

const router = express.Router();

const newChat = z.object({  
    text: z.string().max(1000), 
    session_id: z.number(), 
});

router.post('/new', async (req: Request, res: Response): Promise<void> => { 

    const { text, session_id } = newChat.parse(req.body);

    console.log(text, " | session_id:" , session_id); 

    res.status(200).json({
        message: "Successfully edited the category.",
    });
}); 

export default router;