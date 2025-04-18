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
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-[20rem] z-20 p-2 bg-white border rounded shadow-md hover:bg-gray-100 transition-all"
      >
        {isOpen ? "<" : ">"}
      </button>

      {/* Sidebar */}
      <div
        className={` z-10 top-0 left-0 bg-white h-full transition-all duration-300 ease-in-out shadow-xl shadow-blue-gray-900/5 ${
          isOpen ? "w-80 p-4" : "w-16 p-2"
        }`}
      >
        <div className="p-2">
          <h5
            className={`text-xl font-semibold text-blue-gray-900 transition-opacity duration-200 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            History
          </h5>
        </div>
        <nav className="flex flex-col gap-2 mt-4">
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
