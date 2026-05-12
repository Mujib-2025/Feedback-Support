import express from "express";
import {
  singleTicketPage,
  addMessage,
  updateTicketStatus,
} from "../controllers/ticketController.js";

const router = express.Router();

router.get("/", singleTicketPage);
router.post("/reply", addMessage);
router.post("/status", updateTicketStatus);

export default router;
