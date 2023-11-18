const db = require("../services/SetUpMySQL");

const Router = require("express");
const r = Router();

r.get("/tasks", async (req, res) => {
  try {
    const query = "SELECT * FROM tasks";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).json(results);
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = r;
