import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Form from './form'
import { CONFIG } from "../../config-global"
import axios, {AxiosError} from 'axios';
import z from "zod" 
import { useAuth } from '../../context/AuthContext';

const loginSchema = z.object({
    email: z.string().email("Invalid email address, please enter correct email address. (eg. aran@gmail.com)"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const validateLoginInput = (data: Record<string, any>) => {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
        return result.error.errors[0].message; // Return first error message
    }
    return null;
};

export default function RegisterView() { 
    
    const [email, setEmail] = useState<string|undefined>(undefined);   
    const [password, setPassword] = useState<string|undefined>(undefined); 
    const [errorText, setErrorText] = useState<string|undefined>(undefined); 
    const [loading, setLoading] = useState<Boolean>(false);   

    const userContext = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = () => {
        const loginUser = async () => {   

            const body = {
                email, 
                password
            };

            const validationError = validateLoginInput(body);
            if (validationError) {
                setErrorText(validationError);
                return; // Stop API call if invalid input
            }
            try {
                
                const response = await axios.post(`${CONFIG.baseUrl}/login`, 
                    body,
                    {
                        headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });  

                if(response.status === 200){ 
                    userContext.login(response.data); 
                    navigate("/app");
                }else {
                    setErrorText(response.data)
                }
                
                setLoading(false); 
            } catch (error:any) { 
                setLoading(false); 
                
                console.error(error); 
                setErrorText(error.response.data); 
            }
        }
        setLoading(true); 
        loginUser(); 
    }

    return (
        <Form
            email={email} 
            password={password}
            setEmail={setEmail} 
            setPassword={setPassword}
            errorText={errorText}
            setErrorText={setErrorText}
            handleSubmit={handleSubmit}
            loading={loading}
        />
    );
}
