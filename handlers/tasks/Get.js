const { getTodayTasks } = require("../../entities/Tasks");
const { tokenVerification } = require("../../middlewares/JWT");

const Router = require("express");
const r = Router();

r.get("/today-tasks", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Unauthorized");
  }

  const userId = await tokenVerification(token, res);
  if (!userId) {
    return res.status(400).json("Unauthorized");
  }

  try {
    const tasks = await getTodayTasks(userId);
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = r;
