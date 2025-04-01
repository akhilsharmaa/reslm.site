import multer from "multer"; 
import path from "path"  

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./tmp/pdf/"); 
    },
    filename: (req, file, cb) => { 
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
})

export const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }  // 10MB in bytes
})