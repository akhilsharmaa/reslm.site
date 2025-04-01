
import express, { Request, Response } from 'express'; 
import AuthenticatedRequest from '../../interface/authReq'
import authenticate from "../../middleware/authenticate.middleware"
import multer from "multer"; 
import s3 from "../../services/s3Client" 
import { PutObjectCommand , GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; 
import generateS3FileKey from "../../utils/generateS3FileKey"; 
import { S3_BUCKET_NAME } from "../../config"
import prisma from '../../database/prisma';
import path from "path"  
import { fromPath } from "pdf2pic";
import { upload } from "../../utils/savePdfToDisk"
import { convertPdfToImage } from '../../utils/convertPdfToImg'; 
import { parseTextFromPdf } from '../../utils/parsePdf'

import fs from 'fs';
import { textSplitter } from '../../utils/textSplitter';
import { createEmbedding } from '../../utils/createEmbedding';

const router = express.Router(); 

router.post("/new", upload.single('file'), authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {  

    if(!req.file){
        res.status(401).send("No file found!, Please select a file")
        return; 
    }

    const fileName : string = req.file.filename;  
    const fileKey = generateS3FileKey(req.file?.filename); 
    const fileType = 'image/jpeg'; 
    const filePath =  req.file.path;
    const originalname = req.file.originalname; 

    // ** Converting PDF to Image /
    const imagePath = await convertPdfToImage(fileName, filePath)  

    // reading the converted image file 
    await fs.readFile(imagePath, (err, buffer) => {  
        
        const putObjectCommand = new PutObjectCommand({
            Bucket: S3_BUCKET_NAME, 
            Key:  fileKey,      // file path inside s3 bucket
            Body: buffer,           
            ContentType: fileType
        })
        
        s3.send(putObjectCommand).then(()=> { 
            console.log(`+ Success: S3BUCKET(PutObject) ADDED "${putObjectCommand.input.Key}" to the S3 bucket.`);
        }).catch((error) => {
            res.status(500).send("Failed to upload the file.");   
        });    
    });  

    const getObjectCommand = await new GetObjectCommand({
        Bucket: S3_BUCKET_NAME,  
        Key: fileKey,
    })

    // ** Getting the PUBLIC URL of the image /
    const publicUrl:string|void = await getSignedUrl(s3, getObjectCommand, { 
        unhoistableHeaders: new Set(["x-amz-checksum-sha256"]), // Set of all x-amz-* headers 
    });

    if(publicUrl && fileType && originalname){
        
        const uploadDB = await prisma.upload.create({
            data: {    
                user_id: Number(req.user._id), 
                url: [publicUrl], 
                s3FileKey: fileKey, 
                fileName: originalname, 
                format: fileType,  
            }
        }).then(() => { 
            console.log(`+ Success: Database(INSERT) Prisma Model.Upload ${fileKey}`);
        })
        
        const upload_db = await prisma.upload.findFirst({where: {s3FileKey: fileKey}})
        
        const doc  = await parseTextFromPdf(filePath); // ** Parsing Text from PDF /
        const splitedTexts = await textSplitter(doc.text); // ** Splitting Text in Chunks 
        const embeddings = await createEmbedding(splitedTexts); // ** Creating embedding from chunks 
        const vectors = embeddings.map(e => `[${e.join(",")}]`); // Convert to PostgreSQL vector format
        
        const result = await prisma.$executeRawUnsafe(`
            INSERT INTO "Embedding" ("text", "embedding", "created_at", "upload_id")
            VALUES ${splitedTexts.map((text, index) => `($${index + 1}::text, $${vectors.length + index + 1}::vector, NOW(), ${upload_db?.id})`).join(',')}
        `, ...splitedTexts, ...vectors);
            
        res.status(200).send("Successfully Upload and created embedding of the file you uploaded. ");   

    }else {
        res.status(400).send("Failed to update file record in database");   
    } 
});

export default router;
