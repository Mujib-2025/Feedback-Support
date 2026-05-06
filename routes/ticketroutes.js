import express from "express";
import { ticketsPage } from "../controllers/ticketController.js";

const router = express.Router();

router.get("/", ticketsPage);

export default router;
