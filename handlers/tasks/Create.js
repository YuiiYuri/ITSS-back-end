const { createTask } = require("../../entities/Tasks");
const { tokenVerification } = require("../../middlewares/JWT");

const Router = require("express");
const express = require("express");

const r = Router();

r.put("/task", express.json(), async (req, res) => {
  const token = req.headers.authorization;
  const credentials = req.body;
  if (!token) {
    return res.status(400).json("Unauthorized");
  }
  const userId = await tokenVerification(token, res);
  if (credentials && userId) {
    try {
      if (
        credentials.taskName === "" ||
        credentials.dueDate === "" ||
        credentials.priorityId === "" ||
        credentials.labelId === ""
      ) {
        return res.status(400).json("Invalid input");
      }
      const createTaskResult = createTask(credentials, userId);
      if (createTaskResult) {
        res.status(200).json("Created task successfully");
      } else {
        return res.status(500).json("Failed to create task");
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json("Internal Server Error");
    }
  }
});

module.exports = r;
