import axios from 'axios'; 
import { CONFIG } from '../../config-global'

export const sendNewUserChat = async (  text: string, 
                                        session_id:number) => {
                                        
    const token = localStorage.getItem("token");  
    try {
        const body = { 
            text, 
            session_id, 
        };
        const response = await axios.post(`${CONFIG.baseUrl}/chat/new`,
            body, 
            {
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}`,
                }
            }
        );
        return response; 
    } catch (error: any) { 
        throw new Error(error); 
    } 
}