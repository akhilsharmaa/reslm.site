import express, { Router } from 'express'; 
const router: Router = express.Router(); 

import getPost from "./posts/get"
import registerUser from "./users/register"
import loginUser from "./users/login"
router.use('', [getPost, registerUser, loginUser]);

import newUpload from "./files/putObject" 
import getUploads from "./files/getFiles" 
router.use("/files", [newUpload, getUploads]); 

import newUserMessage from "./chat/newChat"  
import getAll from "./chat/getAll"  
import sseEvent from "./chat/sseEvent"  
router.use("/chat", [newUserMessage, getAll, sseEvent]); 

import newSession from "./session/new"  
router.use("/session", [newSession]); 

import sseUrl from "./sse/url"  
router.use("/sse", [sseUrl]); 

export default router; 