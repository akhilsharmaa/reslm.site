
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
import { convertToEmbedding } from '../../utils/convertToEmbedding';
import { parseTextFromPdf } from '../../utils/parsePdf'

import fs from 'fs';

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

    // ** Parsing Text from PDF /
    const textFromPdf  = await parseTextFromPdf(filePath);   
    
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
        const deb = prisma.upload.create({
            data: {    
                user_id: Number(req.user._id), 
                url: [publicUrl, publicUrl], 
                s3FileKey: fileKey, 
                fileName: originalname, 
                format: fileType,  
            }
        }).then(() => {
            console.log(`+ Success: Database(INSERT) Prisma Model.Upload ${fileKey}`);
        })
    }else {
        res.status(400).send("Failed to update file record in database");   
    } 
});

export default router;
