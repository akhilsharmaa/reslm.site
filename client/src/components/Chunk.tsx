import { useState } from "react";

interface CollapseProps {
    title:  String,  
    text: String,
}  

function CollapsibleChunk({ title, text }: CollapseProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-2 mr-1">
        <button
          className="py-0.5 px-2 font-light text-xs text-gray-900 focus:outline-none bg-gray-50 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
        {title}
      </button>
      {isOpen && (
        <div className="mt-4 bg-gray-100 p-4 text-base border-l-4 border-gray-400  rounded">
          <p className="text-sm font-light">
            {text} 
          </p>
        </div>
      )}
    </div>
  );
}

export default CollapsibleChunk;
