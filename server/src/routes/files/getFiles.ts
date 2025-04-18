import express, { Request, Response } from 'express'; 
import AuthenticatedRequest from '../../interface/authReq'
import authenticate from "../../middleware/authenticate.middleware" 
import prisma from '../../database/prisma';

const router = express.Router(); 


const fetchEmbeddings = async (upload_id:number) => {
    try {

        const uploads = await prisma.embedding.findMany({
            where: {upload_id: Number(upload_id)}
        }) 

        return uploads; 

    } catch (error) {
        console.error(error); 
    }
}

router.post("/all", authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {  
    
    try {

        const uploads = await prisma.upload.findMany({
            where: {user_id: Number(req.user._id)},
            orderBy: {created_at: 'desc'}
        }) 

        const promises = uploads.map(async (upload:any) => {
            const cur = await fetchEmbeddings(upload.id);
            return {
                ...upload,
                embeddings: cur
            };
        });
        
        const results = await Promise.all(promises);    
        res.status(200).json(results); 
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong, please try again later.")
    }
});

export default router;
