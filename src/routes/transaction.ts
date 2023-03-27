import express from "express";
import { createTransaction, getAllTransactions } from "../controller/transaction";
import { auth } from "../middleware/auth";
const router = express.Router();

router.post("/create/:categoryId", auth, createTransaction);
router.get("/getAll", auth, getAllTransactions);

export default router;
