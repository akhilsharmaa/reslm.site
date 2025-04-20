import React from 'react'

function ChatSkeleton() {
  return (
    <div role="status" className="space-y-10 animate-pulse w-full"> 
 
        <div className="flex flex-wrap justify-end w-full">
            <div className="h-10 bg-blue-200 rounded-md w-64"></div>
        </div>

        <div className="flex items-center w-full">
            <div className="h-10 bg-gray-200 rounded-md w-64"></div>
        </div>
        
        <div className="flex items-center w-full">
            <div className="h-24 bg-gray-200 rounded-md  w-2/3"></div>
        </div> 

        <div className="flex flex-wrap justify-end w-full">
            <div className="h-10 bg-gray-200 rounded-md w-64"></div>
        </div>

        <div className="flex items-center w-full">
        <div className="h-10 bg-gray-200 rounded-md w-64"></div>
        </div>
 
        <div className="flex flex-wrap justify-end w-full">
            <div className="h-10 bg-gray-200 rounded-md w-64"></div>
        </div>

        <div className="flex items-center w-full">
            <div className="h-64 bg-gray-200 rounded-md w-2/3"></div>
        </div> 

        <div className="flex flex-wrap justify-end w-full">
            <div className="h-10 bg-gray-200 rounded-md  w-64"></div>
        </div>


        <span className="sr-only">Loading...</span>
    </div>
  )
}

export default ChatSkeleton