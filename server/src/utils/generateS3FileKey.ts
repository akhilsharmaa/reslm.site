import * as crypto from "node:crypto";

const generateS3FileKey = (filename: string) => {
    const generatedName = String(crypto.randomBytes(20).toString('hex')); 
    const generatedFileKey = `assets/${filename}`; 
    return generatedFileKey; 
}   

export default generateS3FileKey; 