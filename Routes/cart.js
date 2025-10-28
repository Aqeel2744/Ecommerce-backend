import express from 'express';
import { addToCart, clearCart, decreaseProudctQty, removeCart, userCart } from '../Controllers/cart.js';
import { Authenticated } from '../Middleware/Auth.js';

const router = express.Router();

router.post('/add' , Authenticated , addToCart );

router.get('/user' , Authenticated  , userCart);

router.delete('/remove/:productId' , Authenticated   , removeCart);

router.delete('/remove' , Authenticated   , clearCart);

router.post('/--qty' , Authenticated   , decreaseProudctQty);

export default router;