import * as mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "127.0.0.1",
  port: 3307,
  user: "root",
  password: "ali99!xA",
  database: "feedback_support",
  connectionLimit: 5,

  allowPublicKeyRetrieval: true,
});

export async function getAllFeedback() {
  let conn;

  try {
    conn = await pool.getConnection();

    const rows = await conn.query("SELECT * FROM feedback");

    return rows;
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

export async function getCustomers() {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM customers");
  conn.release();
  return rows;
}

export async function getTickets() {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM tickets");
  conn.release();
  return rows;
}

export async function getTicketById(id) {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM tickets WHERE id = ?", [id]);
  conn.release();
  return rows[0];
}

export async function getMessagesByTicketId(ticketId) {
  const conn = await pool.getConnection();
  const rows = await conn.query(
    "SELECT * FROM messages WHERE ticket_id = ? ORDER BY created_at ASC",
    [ticketId],
  );
  conn.release();
  return rows;
}

export async function addMessageToTicket(ticketId, message) {
  const conn = await pool.getConnection();

  await conn.query(
    "INSERT INTO messages (ticket_id, sender, message) VALUES (?, ?, ?)",
    [ticketId, "admin", message],
  );

  await conn.query("UPDATE tickets SET handled = NOW() WHERE id = ?", [
    ticketId,
  ]);

  conn.release();
}
