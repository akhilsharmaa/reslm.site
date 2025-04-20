import { Chunk } from "../models/chat"; 

export const getChunksAsStringByChat = (chunks: Chunk[]) => {
    let chunksString = ""; 
    chunks.forEach((chunk, index) => { 
        chunksString += `CHUNK-${index}\n` + chunk.text; 
    })   
    return chunksString; 
}