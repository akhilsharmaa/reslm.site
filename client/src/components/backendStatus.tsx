import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CONFIG } from '../config-global';

function BackendStatus() {

    const [ statusCode, setStatusCode ] = useState<number>(0); 
    const [ responseText, setResponseText ] = useState<string>("Waiting to connect"); 
    

    const StatusIcon = ({statusCode=0}) => {
        if(statusCode === 200){
            return <span className="flex w-3 h-3 me-3 bg-green-500 rounded-full"></span> 
        }else {
            return <span className="flex w-3 h-3 me-3 bg-red-500 rounded-full"></span>
        }
    } 

    useEffect(() => {
        const start = async () => {
            const response = await axios.get(CONFIG.baseUrl);
            setStatusCode(response.status); 
            setResponseText(response.data); 
        }
        start(); 
    }, []) 


    return (
        <div className='fixed bottom-10 left-10 flex flex-wrap justify-center items-center border-4 px-3'> 
            <StatusIcon statusCode={statusCode}/>
            <span>{responseText}</span> 
        </div>
    )
}

export default BackendStatus