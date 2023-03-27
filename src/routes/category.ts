import express from "express";
import { createCategory, getAllCategories } from "../controller/category";
import { auth } from "../middleware/auth";
const router = express.Router();

router.post("/create", auth, createCategory);
router.get("/getAll", auth, getAllCategories);

export default router;
