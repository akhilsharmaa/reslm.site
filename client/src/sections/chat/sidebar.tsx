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
    <div className="relative"> 
      <div > 
        <nav className="">
          {sessions.map((session, index) => (
            <div
              key={index}
              role="button"
              className="flex items-center p-3 rounded-lg hover:bg-blue-gray-50 hover:text-blue-gray-900 transition-all"
            >
              <div className="grid place-items-center mr-4"> 
              </div>
                {isOpen && 
                  <a 
                    className="text-base"
                    href={`/chat/${session.id}`}  >
                    {session.text}
                  </a>} 
              </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
