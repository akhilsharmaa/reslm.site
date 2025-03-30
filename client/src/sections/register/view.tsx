import { useState } from 'react';
import Form from './form'

export default function RegisterView() { 
    
    const [email, setEmail] = useState<string|undefined>(undefined);  
    const [name, setName] = useState<string|undefined>(undefined);  
    const [password, setPassword] = useState<string|undefined>(undefined); 
    const [errorText, setErrorText] = useState<string|undefined>(undefined); 

    const handleSubmit = () => {
        const loginUser = async () => {
            console.log(name);
            console.log(email);
            console.log(password); 
        }
        loginUser(); 
    }

    return (
        <Form
            email={email}
            name={name}
            password={password}
            setEmail={setEmail}
            setName={setName}
            setPassword={setPassword}
            errorText={errorText}
            setErrorText={setErrorText}
            handleSubmit={handleSubmit}
        />
    );
}
