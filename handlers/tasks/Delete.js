const { tokenVerification } = require("../../middlewares/JWT");
const { deleteTask } = require("../../entities/Tasks");

const Router = require("express");
const express = require("express");

const r = Router();

r.delete("/task", express.json(), async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Unauthorized");
  }
  const userId = await tokenVerification(token, res);
  if (!userId) {
    return res.status(400).json("Unauthorized");
  }

  const { taskId } = req.body;
  if (!taskId) {
    return res.status(400).json("Bad request");
  }

  try {
    const deleteTaskResult = await deleteTask(taskId, userId);
    if (deleteTaskResult) {
      res.status(200).json("Deleted task successfully");
    } else {
      return res.status(500).json("Failed to delete task");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = r;
