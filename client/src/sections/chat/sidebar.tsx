import { useEffect, useState } from "react";
import { fetchAllSessions } from "./fetchAllSessions";
import UserSession from "../../models/UserSession";
import { Link } from "react-router-dom";
import { Search, Upload, MessageSquare, BookOpen, ChevronRight, ArrowRight } from 'lucide-react';
import SessionsSkeleton from "../../components/SessionsSkeleton";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [sessions, setSessions] = useState<UserSession[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
      const handleFetch = async () => {
          const result = await fetchAllSessions(); 
          setSessions(result.data);
          setIsLoading(false); 
      } 

      handleFetch(); 
  }, [])

  return ( 
      <div className={`h-screen bg-white border-r-2 border-gray-400 transition-all duration-300`}>
        <div className="overflow-y-auto h-[calc(100vh-60px)]">
          <a className="flex flex-wrap justify-center my-6 items-center"
              href="/">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-indigo-600">reslm.site</span>
          </a>

          <div className="flex justify-between items-center p-4 border-t-2 border-y-2 border-slate-200">
            <h2 className={`font-medium text-slate-800 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
              Conversations
            </h2> 
          </div>
    
          <nav className="p-2">  
              <a className="block py-2.5 px-5 w-100 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100  "
                  href="/chat/new">
                New chat
              </a>  

              {isLoading && <SessionsSkeleton/>}

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