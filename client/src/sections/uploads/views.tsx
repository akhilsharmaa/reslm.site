import UploadObject from "./UploadFileView"; 
import GetAllFilesView from "./GetAllFilesView"
import { useState } from "react";

export default function UploadView() { 
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col h-screen border-l-2 border-gray-200 transition-all duration-300">  
        <div className="flex-1 overflow-auto p-4">
          <UploadObject />
          <GetAllFilesView /> 
      </div>
      </div>
    );
  }