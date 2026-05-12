import express from "express";
import { feedbackPage } from "../controllers/feedbackController.js";

const router = express.Router();
router.get("/", feedbackPage);

export default router;
