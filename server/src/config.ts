import dotenv from 'dotenv';
dotenv.config();

export const JWTPRIVATEKEY: string              = process.env.JWTPRIVATEKEY || "JWTPRIVATEKEYJWTPRIVATEKEY";
export const SSEPRIVATEKEY: string              = process.env.SSEPRIVATEKEY || "SSEPRIVATEKEYSSEPRIVATEKEY";
export const PORT                               = process.env.PORT || 8000;
export const AWS_ACCESS_KEY: string             = process.env.AWS_ACCESS_KEY || "NA";
export const AWS_SECRET_ACCESS_KEY: string      = process.env.AWS_SECRET_ACCESS_KEY || "NA";
export const S3_BUCKET_REGION: string           = "us-east-1"; 
export const S3_BUCKET_NAME: string             = process.env.S3_BUCKET_NAME || "NA"; 
export const OPENAI_API_KEY: string             = process.env.OPENAI_API_KEY || "NA"; 