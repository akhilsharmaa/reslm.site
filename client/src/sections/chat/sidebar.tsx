import { useEffect, useState } from "react";
import { fetchAllSessions } from "./fetchAllSessions";
import UserSession from "../../models/UserSession";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [sessions, setSessions] = useState<UserSession[]>([]); 

  useEffect(() => {
      const handleFetch = async () => {
          const result = await fetchAllSessions(); 
          setSessions(result.data); 
      } 
      handleFetch(); 
  }, [])

  return ( 
      <div className={`h-screen bg-white border-r-2 border-gray-200 transition-all duration-300`}>
        <div className="flex justify-between items-center p-4 border-b border-slate-200">
          <h2 className={`font-medium text-slate-800 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
            Conversations
          </h2>
          {/* <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500"
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button> */}
        </div>
  
        <div className="overflow-y-auto h-[calc(100vh-60px)]">
          <nav className="p-2">  
              <a className="block py-2.5 px-5 w-100 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100  "
                  href="/chat/new">
                New chat
              </a>  
            {sessions.map((session, index) => (
              <div
                key={index}
                role="button"
                className="flex items-center p-3 mb-1 rounded-lg hover:bg-slate-200"
              >
                <div className="grid place-items-center mr-3 text-slate-500">
                  {/* <MessageSquare size={isOpen ? 16 : 20} /> */}
                </div>
                {isOpen && (
                  <a
                    className="text-slate-700 text-sm truncate"
                    href={`/chat/${session.id}`}
                  >
                    {session.text}
                  </a>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    );
  }