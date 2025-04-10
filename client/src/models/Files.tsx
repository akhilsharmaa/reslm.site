interface Embedding{ 
    id: String, 
    text: String, 
    name: String,  
    created_at: Date, 
    upload_id: number, 
}

export interface File{ 
    id: String, 
    username: String, 
    name: String, 
    fileName: String, 
    credits: number,  
    url: String[]
    format: String, 
    s3FileKey: String,  
    session_id: number,
    user_id: number,
    created_at: Date
    embeddings: Embedding[]
}