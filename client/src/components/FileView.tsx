import React from 'react'
import { File } from '../models/Files'


interface FileViewProps {
    file:  File,  
} 

// TODO ADD CAROSEL FOR THE data. 

function FileView({file}: FileViewProps) {
  return (  
        <div className=" "> 
            
            <div className="w-full  bg-white border border-gray-200 rounded-lg shadow-sm "> 
                <img 
                    className="w-full h-96  rounded-lg object-cover"  
                    src={`${file.url[0]}`} 
                    alt="" />
            </div> 
            <p className='w-1/2 text-sm'>{file.fileName}</p> 
            
        </div> 
    )
}

export default FileView; 