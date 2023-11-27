const { createFilter } = require("../../entities/Filters");
const { tokenVerification } = require("../../middlewares/JWT");

const Router = require("express");
const express = require("express");

const r = Router();

r.put("/filter", express.json(), async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json("Unauthorized");
  }
  const userId = await tokenVerification(token, res);
  if (!userId) {
    return res.status(401).json("Failed to authorize user");
  }

  const filter = req.body;
  if (filter) {
    try {
      if (filter.filterName === "" || filter.color === "") {
        return res.status(400).json("Invalid input");
      }
      const createFilterResult = createFilter(filter, userId);
      if (createFilterResult) {
        res.status(200).json("Created filter successfully");
      } else {
        res.status(500).json("Failed to create filter");
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
