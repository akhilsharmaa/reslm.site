import { fromPath } from "pdf2pic";

export const convertPdfToImage = (filename: string, filepath: string) => {
    
    const options = {
        density: 100,
        saveFilename: filename,
        savePath: "./tmp/images/",
        format: "png",
        width: 600,
        height: 600
    };
    
    const convert = fromPath(filepath, options);
    const pageToConvertAsImage = 1;
    
    convert(pageToConvertAsImage, { responseType: "image" })
    .then((resolve) => {
        console.log("Page 1 is now converted as image");
        return resolve;
    });
}