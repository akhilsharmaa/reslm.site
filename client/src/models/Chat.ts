export enum ChatType {
    SYSTEM = "SYSTEM",
    HUMAN = "HUMAN",
    AI = "AI",
    THINKING = "THINKING"
  }
  
  export default interface ChatBody {
    id: number;
    text: string;
    type: ChatType;
    session_id: number;
    created_at: Date;
  }