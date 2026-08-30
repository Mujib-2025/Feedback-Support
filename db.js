import mysql from "mysql2/promise";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./dbconfig.json", "utf-8"));
const pool = mysql.createPool(config);

export async function getAllFeedback() {
  const [rows] = await pool.query(`
    SELECT
      f.*,
      su.fullname AS user_fullname
    FROM feedback f
    LEFT JOIN system_user su ON f.from_user = su.id
    ORDER BY f.arrived DESC
  `);
  return rows;
}
export async function getCustomers() {
  const [rows] = await pool.query("SELECT * FROM customer");
  return rows;
}

export async function getTickets() {
  const [rows] = await pool.query(`
    SELECT
      st.*,
      c.name AS customer_name,
      ts.description AS status_description
    FROM support_ticket st
    JOIN customer c ON st.customer_id = c.id
    JOIN ticket_status ts ON st.status = ts.id
  `);
  return rows;
}

export async function getTicketById(id) {
  const [rows] = await pool.query(
    `
    SELECT
      st.*,
      c.name AS customer_name,
      ts.description AS status_description
    FROM support_ticket st
    JOIN customer c ON st.customer_id = c.id
    JOIN ticket_status ts ON st.status = ts.id
    WHERE st.id = ?
    `,
    [id],
  );
  return rows[0];
}

export async function getMessagesByTicketId(ticketId) {
  const [rows] = await pool.query(
    `
    SELECT
      sm.*,
      su.fullname,
      su.email
    FROM support_message sm
    JOIN system_user su ON sm.from_user = su.id
    WHERE sm.ticket_id = ?
    ORDER BY sm.created_at ASC
    `,
    [ticketId],
  );
  return rows;
}

export async function addMessageToTicket(ticketId, message) {
  const adminUserId = 14;

  await pool.query(
    "INSERT INTO support_message (ticket_id, reply_to, from_user, body) VALUES (?, NULL, ?, ?)",
    [ticketId, adminUserId, message],
  );

  await pool.query("UPDATE support_ticket SET handled = NOW() WHERE id = ?", [
    ticketId,
  ]);
}

export async function getAllStatuses() {
  const [rows] = await pool.query("SELECT * FROM ticket_status");
  return rows;
}

export async function updateTicketStatus(ticketId, newStatus) {
  await pool.query("UPDATE support_ticket SET status = ? WHERE id = ?", [
    newStatus,
    ticketId,
  ]);

  if (newStatus == 4) {
    await pool.query("UPDATE support_ticket SET handled = NOW() WHERE id = ?", [
      ticketId,
    ]);
  }
}

export async function findUserByIdentifier(identifier) {
  const isNumeric = !isNaN(Number(identifier));
  let query;
  let params;
  if (isNumeric) {
    query = `SELECT * FROM system_user WHERE id = ? AND admin = true`;
    params = [Number(identifier)];
  } else {
    query = `SELECT * FROM system_user WHERE email = ? AND admin = true`;
    params = [identifier];
  }
  const [rows] = await pool.query(query, params);
  return rows[0] || null;
}
