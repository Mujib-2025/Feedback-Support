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
} from "../db.js";

export async function singleTicketPage(req, res) {
  const id = req.query.id;

  const ticket = await getTicketById(id);
  const messages = await getMessagesByTicketId(id);

  res.render("ticket", { ticket, messages });
}

export async function addMessage(req, res) {
  const { ticket_id, message } = req.body;

  await addMessageToTicket(ticket_id, message);

  res.redirect(`/ticket?id=${ticket_id}`);
}
