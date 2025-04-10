import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { string } from "zod";

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1500,
    chunkOverlap: 200,
});

export const textSplitter = async (text: string) => {

    const output = await splitter.createDocuments([text]); 

    const texts:string[] = [] 
    output.forEach((doc) => {  
        texts.push(doc.pageContent);  
    })  
    
    return texts;
}