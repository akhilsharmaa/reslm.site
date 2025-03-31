
import { S3Client }  from "@aws-sdk/client-s3";
import {AWS_ACCESS_KEY, 
        AWS_SECRET_ACCESS_KEY, 
        S3_BUCKET_REGION} from "../config"

const s3 = new S3Client({
    credentials:{
        accessKeyId: AWS_ACCESS_KEY, 
        secretAccessKey:  AWS_SECRET_ACCESS_KEY
    },
    region: S3_BUCKET_REGION
})

export default s3; 
