const { getLabels } = require("../../entities/Labels");
const { tokenVerification } = require("../../middlewares/JWT");

const Router = require("express");
const r = Router();

r.get("/labels", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Token not found");
  }
  const userId = await tokenVerification(token, res);
  if (!userId) {
    return res.status(401).json("Failed to authorize user");
  }

  try {
    const labels = await getLabels(userId);
    if (labels) {
      res.status(200).json(labels);
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = r;
