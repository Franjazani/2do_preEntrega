import Router from "express";
import productsRouter from "./products";
import categoriesRouter from './category.js';
import cartRouter from "./cart.js";

const router = Router();

router.use("/products", productsRouter);
router.use('/categories', categoriesRouter);
router.use("/cart", cartRouter);

export default router