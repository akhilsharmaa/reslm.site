import React, {} from 'react' 
import UploadView from '../sections/uploads/views';
import Navbar from '../components/navbar';
import ChatInterface from '../sections/chat/view';
import Sidebar from '../sections/chat/sidebar';
import { useSearchParams } from 'react-router-dom';

function Main() { 
  return (
    <>
    <Navbar/>  
        <Sidebar/> 
        <ChatInterface />   
        <UploadView/>     
    </>
  )
}

export default Main;
