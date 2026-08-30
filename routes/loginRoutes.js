import express from "express";
import { loginPage, loginPost } from "../controllers/loginController.js";

const router = express.Router();

router.get("/", loginPage);
router.post("/", loginPost);

export default router;
