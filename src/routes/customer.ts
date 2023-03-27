import express from "express";
import { createCustomer, getAllCustomers } from "../controller/customer";
import { auth } from "../middleware/auth";
const router = express.Router();

router.post("/create", auth, createCustomer);
router.get("/getAll", auth, getAllCustomers);

export default router;
