import express, { Request, Response } from 'express'; 
import AuthenticatedRequest from '../../interface/authReq'
import authenticate from "../../middleware/authenticate.middleware" 
import prisma from '../../database/prisma';  
const router = express.Router(); 

router.post("/all", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {  
    
    const allSession = await prisma.session.findMany({
        where: { user_id: Number(req.user._id),  }
    });  

    let results:any[] = []
    for (const session of allSession) {
        try {
            const chat = await prisma.chat.findFirst({
                where: { 
                    session_id: session.id,  
                },
            });

            if(chat){
                results.push({
                    ...chat,
                    ...session, 
                });
            } 
        } catch (err) { 
            console.error(err);
        }    
    }  
    res.status(200).send(results); 
}); 

export default router;