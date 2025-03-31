import React from 'react'
import { File } from '../models/Files'


interface FileViewProps {
    file:  File,  
} 

function FileView({file}: FileViewProps) {
  return (  
        <div className="w-full  bg-white border border-gray-200 rounded-lg shadow-sm "> 
            <img 
                className="w-full h-96  rounded-lg object-cover"  
                src={`${file.url}`} 
                alt="" />
            <p className='w-1/2 text-sm'>{}</p>
        </div> 
    )
}

export default FileView; 