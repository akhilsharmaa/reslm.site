export enum ChatType {
    SYSTEM = "SYSTEM",
    HUMAN = "HUMAN",
    AI = "AI",
    THINKING = "THINKING"
  }
  
  export interface ChatChunk{
    id: number, 
    text: string, 
    embedding_id: number 
    chat_id:number
  }

  export default interface ChatBody {
    id: number;
    text: string;
    type: ChatType;
    session_id: number;
    created_at: Date;
    chunks: ChatChunk[];  
  }