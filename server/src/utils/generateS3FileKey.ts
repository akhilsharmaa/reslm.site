import bcrypt from "bcrypt";  

const generateS3FileKey = () => {
    const generatedName = String(bcrypt.genSaltSync(10)); 
    const generatedFileKey = `assets/${generatedName}`; 
    return generatedFileKey; 
}   

export default generateS3FileKey; 