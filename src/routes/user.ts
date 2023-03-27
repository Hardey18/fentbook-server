import express from "express";
import { createUser, getUser, loginUser, updatePhoto, updateUser } from "../controller/user";
import { auth } from "../middleware/auth";
const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/getUser/:id", auth, getUser);
router.put("/update", auth, updateUser);
router.put("/updatePhoto", auth, updatePhoto);

export default router;
