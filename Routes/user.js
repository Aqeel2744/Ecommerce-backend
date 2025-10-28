import express from 'express';
import { userReg, userLogin , getAllUsers, userProfile }   from '../Controllers/user.js';
import { Authenticated } from '../Middleware/Auth.js';

const router = express.Router();

// register User
router.post("/register" , userReg);

// login User
router.post("/login" , userLogin);

// get all users 
router.get("/all" , getAllUsers );

// user profile 
router.get('/profile' , Authenticated , userProfile);

export default router;