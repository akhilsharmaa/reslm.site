import express, { Router } from 'express'; 
import getPost from "./posts/get"
import registerUser from "./users/register"

const router: Router = express.Router(); 
router.use('', [getPost, registerUser])

export default router; 