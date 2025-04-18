import { ChatType } from "./Chat";

export default interface UserSession {
    id: number;
    text: string; 
    type: ChatType;
    user_id: number; 
    visiblity: string,
    session_id: number;
    created_at: Date;
    updated_at: Date;
}