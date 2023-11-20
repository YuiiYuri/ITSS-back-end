const {
  getTodayTasks,
  getUpcomingTasks,
  getAllTasks,
  getAllTasksAdmin,
} = require("../../entities/Tasks");
const { verifyAdmin } = require("../../entities/Users");
const { tokenVerification } = require("../../middlewares/JWT");

const Router = require("express");
const r = Router();

r.get("/today-tasks", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Token not found");
  }

  const userId = await tokenVerification(token, res);
  if (!userId) {
    return res.status(401).json("Failed to authorize user");
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

r.get("/upcoming-tasks", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Token not found");
  }

  const userId = await tokenVerification(token, res);
  if (!userId) {
    return res.status(401).json("Failed to authorize user");
  }

  try {
    const tasks = await getUpcomingTasks(userId);
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

r.get("/all-tasks", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Token not found");
  }

  const userId = await tokenVerification(token, res);
  if (!userId) {
    return res.status(401).json("Failed to authorize user");
  }

  try {
    const tasks = await getAllTasks(userId);
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

r.get("/admin/all-tasks", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Token not found");
  }

  const userId = await tokenVerification(token, res);
  if (!userId) {
    return res.status(401).json("Failed to authorize user");
  }

  const adminVerifyResult = await verifyAdmin(userId);
  if (adminVerifyResult !== "admin") {
    return res.status(403).json("No permission");
  }

  try {
    const tasks = await getAllTasksAdmin();
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
