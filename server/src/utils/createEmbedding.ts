import { embeddings } from "../services/openai_embeddings"

export const createEmbedding =  async (texts:string[]) => {
    return await embeddings.embedDocuments(texts);  
}