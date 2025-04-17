import UploadObject from "./UploadFileView"; 
import GetAllFilesView from "./GetAllFilesView"
import { useState } from "react";

export default function UploadView() { 
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative h-screen ">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 right-4 z-50 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {isOpen ? "Close" : "Open"}
        </button>

        <div
          className={`fixed top-0 right-0 h-full bg-gray-100 shadow-xl transform transition-transform duration-300 ease-in-out w-1/4 p-4 overflow-y-auto ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`} 
        >
          <UploadObject />
          <GetAllFilesView />
        </div>
      </div>
    );
  }