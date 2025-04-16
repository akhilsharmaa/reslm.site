import axios from 'axios'; 
import { CONFIG } from '../../config-global'

export const getSSEUrl = async (session_id: number) => {  
    const token = localStorage.getItem("token");  
    try {
        const body = {session_id};
        const response = await axios.post(`${CONFIG.baseUrl}/sse/url`,
            body, 
            {
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}`,
                }
            }
        ); 
        if(response.status === 200)return response.data;  
        throw new Error("Failed to create SSE URL Token !"); 
    } catch (error: any) { 
        throw new Error(error); 
    } 
}