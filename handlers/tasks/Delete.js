const { createTask } = require("../../entities/Tasks");
const { tokenVerification } = require("../../middlewares/JWT");

const Router = require("express");
const express = require("express");

const r = Router();

r.delete("/task", express.json(), async (req, res) => {
  const token = req.headers.authorization;
  const credentials = req.body;
  if (!token) {
    return res.status(400).json("Unauthorized");
  }

  
});
