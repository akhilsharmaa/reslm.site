import express, { Request, Response } from 'express';
import { generateAuthToken } from "../../utils/generateJwtToken";
import prisma from "../../database/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";  
import logger from '../../utils/logger';

const router = express.Router();

const loginSchema = z.object({  
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
                            .max(20, "Password must be at less then 20 characters long")
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try { 

        const { email, password } = loginSchema.parse(req.body);
        const existingUser = await prisma.user.findFirst({where: {email}}); 

        if(existingUser){
            if (await bcrypt.compare(password, existingUser.password)) {
                // Sending the token to the user. 
                const token = generateAuthToken(existingUser.id); 
                res.status(200).send(token); 
            } else {
                res.status(400).send("Incorrect Password!"); 
            }
        }else {
            res.status(404).send("User not found, please register before login!");
        }
    } catch (error: any) {

        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Validation error", errors: error.errors });
        }

        logger.error('Error creating user:', error);
        res.status(500).json({ message: "Failed to login user, please try again later." , error});
    }
});

export default router;
