export enum ChatType {
    SYSTEM = "SYSTEM",
    HUMAN = "HUMAN",
    AI = "AI",
    THINKING = "THINKING"
  }
  
  interface Chunk{
    id: number, 
    text: string, 
  }

  export default interface ChatBody {
    id: number;
    text: string;
    type: ChatType;
    session_id: number;
    created_at: Date;
    similar_embedding_ids: number[]
    similarChunks: Chunk[]
  }