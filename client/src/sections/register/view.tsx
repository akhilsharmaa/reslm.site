import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Form from './form'
import { CONFIG } from "../../config-global"
import axios from 'axios';
import z from "zod" 
import { useAuth } from '../../context/AuthContext';
import BackendStatus from '../../components/backendStatus';

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
                            .max(20, "Password must be at less then 20 characters long")});

                            
const validateRegisterInput = (data: Record<string, any>) => {
    const result = registerSchema.safeParse(data);
    if (!result.success) {
        return result.error.errors[0].message; // Return first error message
    }
    return null;
};

export default function RegisterView() { 
    
    const [email, setEmail] = useState<string|undefined>(undefined);  
    const [username, setUsername] = useState<string|undefined>(undefined);  
    const [name, setName] = useState<string|undefined>(undefined);  
    const [password, setPassword] = useState<string|undefined>(undefined); 
    const [errorText, setErrorText] = useState<string|undefined>(undefined); 
    const [loading, setLoading] = useState<Boolean>(false);   

    const userContext = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = () => {
        const registerUser = async () => {   

            const body = {
                name, 
                username, 
                email, 
                password
            };

            console.log(body);

            const validationError = validateRegisterInput(body);
            if (validationError) {
                setLoading(false); 
                setErrorText(validationError);
                return; // Stop API call if invalid input
            }

            try {
                
                const response = await axios.post(`${CONFIG.baseUrl}/register`, 
                    body,
                    {
                        headers: {
                        "Content-Type": "application/json", 
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
        registerUser(); 
    }

    return (
        <div>

            <Form
                email={email}
                name={name}
                username={username}
                password={password}
                setEmail={setEmail}
                setName={setName}
                setUsername={setUsername}
                setPassword={setPassword}
                errorText={errorText}
                loading={loading}
                setErrorText={setErrorText}
                handleSubmit={handleSubmit}
            />
            <BackendStatus/> 
        </div>
    );
}
