import express, { Request, Response } from 'express'; 
import AuthenticatedRequest from '../../interface/authReq'
import authenticate from "../../middleware/authenticate.middleware" 
import prisma from '../../database/prisma';

const router = express.Router(); 

router.post("/new", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {  
    
    const newSession = await prisma.session.create({
        data: { user_id: Number(req.user._id),  }
    }); 

    res.status(200).send(newSession); 
}); 

export default router;