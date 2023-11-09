const Router = require("express");
const r = Router();

r.get("/", async (req, res) => {
  try {
    const req = req.body;
    res.status(200).send("Hello World!");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = r;
