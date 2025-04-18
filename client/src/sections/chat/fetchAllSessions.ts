import axios from 'axios'; 
import { CONFIG } from '../../config-global'

export const fetchAllSessions = async () => {  
    const token = localStorage.getItem("token");  
    try {
        const body = { };
        const response = await axios.post(`${CONFIG.baseUrl}/session/all`,
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