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

                console.log(response.data);
                
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {uploads.map((file, index)  => {
                return <FileView file={file} />
            })}  
        </div>
    );
}
