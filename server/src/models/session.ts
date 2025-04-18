import { ChatType } from "@prisma/client";

export default interface SessionBody {
    id: number;
    text: string; 
    type: ChatType;
    user_id: number; 
    visiblity: string,
    session_id: number;
    created_at: Date;
    updated_at: Date;
}