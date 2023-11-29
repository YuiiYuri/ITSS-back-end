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
  const user_id = await tokenVerification(token, res);
  if (!user_id) {
    return res.status(401).json("Failed to authorize user");
  }

  const { task_id } = req.body;
  if (task_id) {
    try {
      const deleteTaskResult = await deleteTask(task_id, user_id);
      if (deleteTaskResult) {
        res.status(200).json("Deleted task successfully");
      } else {
        return res.status(500).json("Failed to delete task");
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
