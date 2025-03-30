import express, { Router } from 'express'; 
import getPost from "./posts/get"
import registerUser from "./users/register"
import loginUser from "./users/login"

const router: Router = express.Router(); 
router.use('', [getPost, registerUser, loginUser])

export default router; 