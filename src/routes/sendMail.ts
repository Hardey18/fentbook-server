import express from "express";
// import { createTransaction, getAllTransactions } from "../controller/transaction";
import { auth } from "../middleware/auth";
import { sendMail } from "../controller/sendMail";
const router = express.Router();

router.post("/send-mail/:invoiceId", auth, sendMail);

export default router;
