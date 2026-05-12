import express from "express";
import { customersPage } from "../controllers/customerController.js";

const router = express.Router();
router.get("/", customersPage);

export default router;
