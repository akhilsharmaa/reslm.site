import { useState } from "react";

interface CollapseProps {
    title:  String,  
    text: String,
}  

function CollapsibleChunk({ title, text }: CollapseProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="m-1">
        <button
          className="py-0.5 px-2  text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
        {title}
      </button>
      {isOpen && (
        <div className="mt-2 bg-gray-100 p-4 text-base border-l-4 border-gray-400  rounded">
          <p className="text-xs">
            {text} 
          </p>
        </div>
      )}
    </div>
  );
}

export default CollapsibleChunk;