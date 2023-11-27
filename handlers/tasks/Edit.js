const { tokenVerification } = require("../../middlewares/JWT");
const { editTask } = require("../../entities/Tasks");

const Router = require("express");
const express = require("express");

const r = Router();

r.post("/task", express.json(), async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Unauthorized");
  }
  const userId = await tokenVerification(token, res);
  if (!userId) {
    return res.status(401).json("Failed to authorize user");
  }

  const task = req.body;
  if (task) {
    try {
      if (
        task.taskId === null ||
        task.taskName === "" ||
        task.description === "" ||
        task.dueDate === "" ||
        task.priorityId === null ||
        task.labelId === null
      ) {
        return res.status(400).json("Invalid input");
      }
      const editTaskResult = await editTask(task, userId);
      if (editTaskResult) {
        res.status(200).json("Updated task successfully");
      } else {
        return res.status(500).json("Failed to update task");
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json("Internal Server Error");
    }
  } else {
    return res.status(400).json("Bad request");
  }
});

module.exports = r;
