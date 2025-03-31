import express, { Request, Response } from 'express'; 
import AuthenticatedRequest from '../../interface/authReq'
import authenticate from "../../middleware/authenticate.middleware" 
import prisma from '../../database/prisma';

const router = express.Router(); 

router.post("/all", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {  
    
    try {
        const uploads = await prisma.upload.findMany({
            where: {user_id: Number(req.user._id)}
        })
        res.status(200).json(uploads);

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong, please try again later.")
    }
});

export default router;
