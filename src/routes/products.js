import { checkAdmin } from '../middlewares/auth';
import express from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    checkBodyProduct,
} from '../controllers/products.js';

const router = express.Router(); 

router.get('/', checkAdmin, getAllProducts);
router.get('/:id', checkAdmin, getProductById);
router.post('/', checkAdmin, checkBodyProduct, createProduct);
router.put('/:id', checkAdmin, checkBodyProduct, updateProduct);
router.delete('/:id', checkAdmin, deleteProduct);

export default router;