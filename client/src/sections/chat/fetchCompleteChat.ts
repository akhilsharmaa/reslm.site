import axios from 'axios'; 
import { CONFIG } from '../../config-global'

export const fetchCompleteChat = async (session_id: number) => {  
    const token = localStorage.getItem("token");  
    try {
        const body = {
            session_id
        };
        const response = await axios.post(`${CONFIG.baseUrl}/chat/all`,
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