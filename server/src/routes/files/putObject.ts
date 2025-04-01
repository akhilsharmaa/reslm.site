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
import fs from 'fs';

const router = express.Router(); 

router.post("/new", upload.single('file'), authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {  

    const convertedImage = await convertPdfToImage(req.file?.filename, req.file?.path)
    console.log(convertedImage);

    
    const fileKey = generateS3FileKey(req.file?.filename); 
    const fileType = req.file?.mimetype; 
    const originalname = req.file?.originalname;
    let fileBuffer = req.file?.buffer; 

    await fs.readFile(convertedImage.path, (err, buffer) => {

        const putObjectCommand = new PutObjectCommand({
            Bucket: S3_BUCKET_NAME, 
            Key:  fileKey,          // file path 
            Body: buffer,           
            ContentType: 'image/png'   // file type (pdf/image)
        })
        
        s3.send(putObjectCommand).then(()=> { 
            console.log(`+ Success: S3BUCKET(PutObject) ADDED "${putObjectCommand.input.Key}" to the S3 bucket.`);
        }).catch((error) => {
            res.status(500).send("Failed to upload the file.");   
        });    }); 
    
    // TODO: validate the file size limit and also should be pdf.  


    const getObjectCommand = await new GetObjectCommand({
        Bucket: S3_BUCKET_NAME,  
        Key: fileKey,
    })

    // ** Getting the PUBLIC URL of the image /
    const publicUrl:string|void = await getSignedUrl(s3, getObjectCommand, {
        // Set of all x-amz-* headers 
        unhoistableHeaders: new Set(["x-amz-checksum-sha256"]),
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

    res.status(200).send("Route accessed Successfully");   
});

export default router;
