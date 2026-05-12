import { getTickets } from "../db.js";

export async function ticketsPage(req, res) {
  const tickets = await getTickets();
  console.log("DEBUG tickets:", tickets);
  res.render("tickets", { tickets });
}

import {
  getTicketById,
  getMessagesByTicketId,
  addMessageToTicket,
  getAllStatuses,
  updateTicketStatus as updateTicketStatusInDB,
} from "../db.js";

export async function singleTicketPage(req, res) {
  const id = req.query.id;
  const ticket = await getTicketById(id);
  const messages = await getMessagesByTicketId(id);
  const statuses = await getAllStatuses();
  res.render("ticket", { ticket, messages, statuses });
}

export async function addMessage(req, res) {
  const { ticket_id, message } = req.body;
  await addMessageToTicket(ticket_id, message);
  res.redirect(`/ticket?id=${ticket_id}`);
}

export async function updateTicketStatus(req, res) {
  const { ticket_id, status } = req.body;
  await updateTicketStatusInDB(ticket_id, status);
  res.redirect(`/ticket?id=${ticket_id}`);
}
