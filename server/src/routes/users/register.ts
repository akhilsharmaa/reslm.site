import express, { Request, Response } from 'express';
import { createHash } from "../../utils/password"
import prisma from "../../database/prisma"

const router = express.Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    
    const { name, username, email, password } = req.body;      
    let hashedPassword = await createHash(password); 

    try {  
        const newUser = await prisma.user.create({
            data: {
                email: email, 
                username: username, 
                name: name, 
                password: hashedPassword
            }
        }).then(() => {
            res.status(200).json({ 
                "message": "User registered successfully",  
            }); 
        })

    } catch (error) {

        console.error('Error creating user:', error); 

        res.status(400).json({ 
            "message": "Failed to registered user, please try again later.",  
        }); 
    }
});

export default router;
