const generateS3FileKey = (filename: string) => { 
    const generatedFileKey = `assets/${filename}`; 
    return generatedFileKey; 
}   

export default generateS3FileKey; 