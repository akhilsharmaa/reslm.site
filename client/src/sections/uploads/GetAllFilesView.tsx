import { useState, useEffect } from 'react';
import axios from 'axios';
import { CONFIG } from '../../config-global'
import { useAuth } from '../../context/AuthContext' 
import { File } from '../../models/Files';
import FileView from '../../components/FileView';

export default function UploadFileView() {

    const userContext = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string | undefined>(undefined);
    const [uploads, setUploads] = useState<File[]>([]); 

    const fetchAllUploads = () => {
        const fetchUploads = async () => {
            try {
                const body = {};
                const response = await axios.post(`${CONFIG.baseUrl}/files/all`,
                    body, 
                    {
                        headers: {
                            "Content-Type": "application/json", 
                            "Authorization": `Bearer ${userContext.token}`,
                        }
                    }
                ); 
                
                if (response.status === 200) {
                    setUploads(response.data);  
                } else {
                    setErrorText(response.data)
                }

                setLoading(false);
            } catch (error: any) {
                setLoading(false);

                console.error(error);
                setErrorText(error.response.data);
            }
        }
        setLoading(true);
        fetchUploads();
    } 

    useEffect(() => {
        fetchAllUploads();
    }, [])
 
    return (
        <div className="h-40 flex flex-wrap justify-center gap-6">
            {uploads.map((file, index)  => {
                return <FileView
                    key={index}
                    file={file} 
                 />
            })}  
        </div>
    );
}
