import { fromPath } from "pdf2pic";

export const convertPdfToImage = async (filename: string, filepath: string) => {

    try {
        const options = {
            density: 100,
            saveFilename: filename,
            savePath: "./tmp/images/",
            format: "png",
            width: 1240,
            height: 1754,
        };
        
        const convert = await fromPath(filepath, options);
        const PAGETOCONVERT = 1;
        return await convert(PAGETOCONVERT, { responseType: "image" }); 

    } catch (error) {
        throw new Error(`Enable to convert PDF to Image ${error}`)
    }
}