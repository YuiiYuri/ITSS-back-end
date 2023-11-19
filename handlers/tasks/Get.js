const { getTodayTasks } = require("../../entities/Tasks");

const Router = require("express");
const r = Router();

r.get("/today-tasks", async (req, res) => {
  try {
    const tasks = await getTodayTasks();
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
