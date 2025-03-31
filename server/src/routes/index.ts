import express, { Router } from 'express'; 
const router: Router = express.Router(); 

import getPost from "./posts/get"
import registerUser from "./users/register"
import loginUser from "./users/login"
router.use('', [getPost, registerUser, loginUser]);

import newUpload from "./uploads/putObject" 
router.use("/files", [newUpload]); 

export default router; 