import { useState } from "react";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

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
            Sidebar
          </h5>
        </div>
        <nav className="flex flex-col gap-2 mt-4">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              role="button"
              className="flex items-center p-3 rounded-lg hover:bg-blue-gray-50 hover:text-blue-gray-900 transition-all"
            >
              <div className="grid place-items-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {isOpen && <span>Dashboard</span>}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
