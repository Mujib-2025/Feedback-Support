import express from "express";
import {
  singleTicketPage,
  addMessage,
} from "../controllers/ticketController.js";

const router = express.Router();

router.get("/", singleTicketPage);
router.post("/reply", addMessage);

export default router;
