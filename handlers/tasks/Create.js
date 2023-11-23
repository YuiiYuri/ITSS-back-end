const { createTask } = require("../../entities/Tasks");
const { tokenVerification } = require("../../middlewares/JWT");

const Router = require("express");
const express = require("express");

const r = Router();

r.put("/task", express.json(), async (req, res) => {
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
        task.taskName === "" ||
        task.description === "" ||
        task.dueDate === "" ||
        task.priorityId === "" ||
        task.labelId === ""
      ) {
        return res.status(400).json("Invalid input");
      }
      const createTaskResult = createTask(task, userId);
      if (createTaskResult) {
        res.status(200).json("Created task successfully");
      } else {
        res.status(500).json("Failed to create task");
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
