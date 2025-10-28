import express from 'express';
import { addProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '../Controllers/products.js';

const router = express.Router();

router.post("/add" , addProduct);
router.get("/all" , getAllProducts );
router.get("/:id" , getProductById );
router.put("/:id" , updateProductById );
router.delete("/:id" , deleteProductById );

export default router;