import express from "express";
import { createProduct, getAllProducts } from "../controller/product";
import { auth } from "../middleware/auth";
const router = express.Router();

router.post("/create/:categoryId", auth, createProduct);
router.get("/getAll", auth, getAllProducts);

export default router;
