import express from 'express'
import { addAdrress, getAddress } from '../Controllers/address.js';
import { Authenticated } from '../Middleware/Auth.js';

const router = express.Router();


router.post('/add' , Authenticated ,addAdrress);

router.get('/get' ,Authenticated ,  getAddress);

export default router;