import mysql from "mysql2/promise";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./dbconfig.json", "utf-8"));

async function test() {
  try {
    const pool = mysql.createPool(config);
    const [rows] = await pool.execute("SELECT * FROM feedback LIMIT 1");
    console.log("DB connection OK:", rows);
    await pool.end();
  } catch (err) {
    console.log("DB connection ERROR:", err);
  }
}

test();
