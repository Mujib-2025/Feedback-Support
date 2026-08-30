import { findUserByIdentifier } from "../db.js";

export function loginPage(req, res) {
  if (req.session.user) {
    return res.redirect("/tickets");
  }
  const error = req.query.error || null;
  res.render("login", { error });
}

export async function loginPost(req, res) {
  const { identifier } = req.body;
  if (!identifier) {
    return res.redirect("/login?error=missing_identifier");
  }

  const user = await findUserByIdentifier(identifier);
  if (!user) {
    return res.redirect("/login?error=invalid_credentials");
  }

  req.session.user = {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    admin: user.admin,
  };
  res.redirect("/tickets");
}
