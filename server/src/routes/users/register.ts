import express, { Request, Response } from 'express';
import { createHash } from "../../utils/password";
import prisma from "../../database/prisma";
import { z } from "zod";

const router = express.Router();

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
                            .max(20, "Password must be at less then 20 characters long")});

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    try { 

        const { name, 
                username, 
                email, 
                password } = registerSchema.parse(req.body);

        const hashedPassword = await createHash(password);

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                name,
                password: hashedPassword
            }
        });
        
        res.status(200).json({
            message: "User registered successfully",
        });
        
    } catch (error: any) {

        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Validation error", errors: error.errors });
        }
        
        if (error.code === "P2002") {
            res.status(409).json({ message: "Username or email already exists" });
        }
        
        console.error('Error creating user:', error);
        res.status(500).json({ message: "Failed to register user, please try again later." });
    }
});

export default router;
