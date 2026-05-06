import { getCustomers } from "../db.js";

export async function customersPage(req, res) {
  const customers = await getCustomers();
  res.render("customers", { customers });
}
