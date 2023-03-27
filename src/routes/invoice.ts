import express from "express";
import { createInvoice, getAllInvoices, getSingleInvoice, verifyInvoice } from "../controller/invoice";
import { auth } from "../middleware/auth";
const router = express.Router();

router.post("/create/:customerId/:productId", auth, createInvoice);
router.post("/verify/:invoiceId", auth, verifyInvoice);
router.get("/getAll", auth, getAllInvoices);
router.get("/getSingle/:id", auth, getSingleInvoice);

export default router;
