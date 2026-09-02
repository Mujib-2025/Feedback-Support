import { findUserByIdentifier } from "../db.js";
import bcrypt from "bcrypt";

export function loginPage(req, res) {
  if (req.session.user) {
    return res.redirect("/tickets");
  }
  const error = req.query.error || null;
  res.render("login", { error });
}

export async function loginPost(req, res) {
  const { identifier, password } = req.body;

  console.log("Received identifier:", identifier);
  console.log("Received password length:", password ? password.length : 0);

  if (!identifier || !password) {
    console.log("Missing credentials");
    return res.redirect("/login?error=missing_credentials");
  }

  const user = await findUserByIdentifier(identifier);
  console.log("User object from DB:", user);

  if (!user) {
    console.log("User not found");
    return res.redirect("/login?error=invalid_credentials");
  }

  console.log("Stored hash:", user.password);
  console.log("Hash type:", typeof user.password);

  const match = await bcrypt.compare(password, user.password);
  console.log("Password match:", match);

  if (!match) {
    console.log("Password mismatch");
    return res.redirect("/login?error=invalid_credentials");
  }

  req.session.user = {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    admin: user.admin,
  };
  console.log("Login successful for:", user.fullname);
  res.redirect("/tickets");
}
