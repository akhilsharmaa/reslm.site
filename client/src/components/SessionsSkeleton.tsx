import React from 'react'

function SessionsSkeleton() {
  return (
    <div role="status" className="space-y-10 animate-pulse w-full"> 

        <div className="flex items-center w-full">
            <div className="h-10 bg-gray-200 rounded-md w-64"></div>
        </div> 

        <span className="sr-only">Loading...</span>
    </div>
  )
}

export default SessionsSkeleton