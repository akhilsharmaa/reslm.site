import React from 'react'
import { File } from '../models/Files'
import CollapsibleChunk from './Chunk';
import { useState } from "react";


interface FileViewProps {
    file:  File,  
} 

// TODO ADD CAROSEL FOR THE data. 

function FileView({file}: FileViewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (  
        <div className=" "> 
            
            <div className="w-72 p-3 bg-white border border-gray-200 rounded-lg shadow-sm "> 
                
                <img 
                    className="w-full h-96  rounded-lg object-cover"  
                    src={`${file.url[0]}`} 
                    alt="" />

                <p className='w-1/2 text-base p-2'>{file.fileName}</p>  
 

                <div className={`flex flex-wrap overflow-hidden ${isOpen? "h-max" : "h-24"}`}>
                    {file.embeddings.map((embedding, index)  => {
                        return <CollapsibleChunk 
                            key={index}
                            title={`Chunk ${index}`}
                            text={embedding.text}
                        />
                    })} 
                </div>  
            
                <button 
                    className='py-2 px-5 me-2 mb-2 text-sm font-medium text-blue-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100'
                    onClick={() => {setIsOpen(!isOpen)}}>
                        view all
                </button>

            </div>  
        </div> 
    )
}

export default FileView; 