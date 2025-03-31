import express, { Router } from 'express'; 
const router: Router = express.Router(); 

import getPost from "./posts/get"
import registerUser from "./users/register"
import loginUser from "./users/login"
router.use('', [getPost, registerUser, loginUser]);

import newUpload from "./files/putObject" 
import getUploads from "./files/getFiles" 
router.use("/files", [newUpload, getUploads]); 

export default router; 