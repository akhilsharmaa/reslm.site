import fs from 'fs';
import pdf from 'pdf-parse';

export const parseTextFromPdf = async (filepath: string) => {
    let dataBuffer = fs.readFileSync(filepath);
    const result = await pdf(dataBuffer); 
    return result;
} 