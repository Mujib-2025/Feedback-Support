import { getAllFeedback } from "../db.js";

export async function feedbackPage(req, res) {
  const feedback = await getAllFeedback();
  res.render("feedback", { feedback });
}
