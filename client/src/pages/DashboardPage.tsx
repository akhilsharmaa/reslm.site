import React from 'react' 
import UploadView from '../sections/uploads/views';
import Navbar from '../components/navbar';
import ChatInterface from '../sections/chat/view';

function Main() {
  return (
    <>
    <Navbar/>
    <div className='flex'> 
      
        <div className='w-1/2'>
          <ChatInterface/> 
        </div>

        <div className='w-1/2'>        
          <UploadView/>   
        </div>

    </div>
    </>
  )
}

export default Main;
