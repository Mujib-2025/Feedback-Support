import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";

import ticketSingleRoutes from "./routes/ticketSingleRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "your-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use((req, res, next) => {
  if (req.path.startsWith("/login") || req.path === "/logout") {
    return next();
  }
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
});

app.use("/ticket", ticketSingleRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/customers", customerRoutes);
app.use("/tickets", ticketRoutes);
app.use("/login", loginRoutes);

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
