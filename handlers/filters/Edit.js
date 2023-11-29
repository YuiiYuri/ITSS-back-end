const { tokenVerification } = require("../../middlewares/JWT");
const { editFilter } = require("../../entities/Filters");

const Router = require("express");
const express = require("express");

const r = Router();

r.post("/filter", express.json(), async (req, res) => {
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
      if (
        filter.filterId === null ||
        filter.filterName === "" ||
        filter.color === ""
      ) {
        return res.status(400).json("Invalid input");
      }
      const editFilterResult = await editFilter(filter, userId);
      if (editFilterResult) {
        res.status(200).json("Updated filter successfully");
      } else {
        return res.status(500).json("Failed to update filter");
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
