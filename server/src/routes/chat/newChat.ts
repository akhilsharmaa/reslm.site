import express, { Request, Response } from 'express';
import { generateAuthToken } from "../../utils/generateJwtToken";
import prisma from "../../database/prisma";
import { z } from "zod";
import bcrypt from "bcrypt"; 
import { User } from '@prisma/client';

const router = express.Router();

const loginSchema = z.object({  
    email: z.string().email("Invalid email format"),
    session: z.string().min(6, "Password must be at least 6 characters long")
                            .max(20, "Password must be at less then 20 characters long")
});

router.post('/login', async (req: Request, res: Response): Promise<void> => { 

    res.status(200).json({
        message: "Successfully edited the category.",
    });
}); 

export default router;