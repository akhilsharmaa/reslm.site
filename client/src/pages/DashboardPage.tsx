import React, {} from 'react' 
import UploadView from '../sections/uploads/views';
import Navbar from '../components/navbar';
import ChatInterface from '../sections/chat/view';
import Sidebar from '../sections/chat/sidebar';
import { useSearchParams } from 'react-router-dom';

function Main() { 
  return (
    <div className="grid grid-flow-col grid-cols-8">
        <div className='col-span-1'>
          <Sidebar/>
        </div>
        <div className='col-span-5'>
          <ChatInterface />    
        </div>
        <div className='col-span-2'>
          <UploadView/>     
        </div>
    </div>
  )
}

export default Main;
