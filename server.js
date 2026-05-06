import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import ticketSingleRoutes from "./routes/ticketSingleRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/ticket", ticketSingleRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/customers", customerRoutes);
app.use("/tickets", ticketRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
