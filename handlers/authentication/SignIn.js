const { signIn } = require("../../entities/SignIn");
const { secretKey } = require("../../services/JWT");

const Router = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const r = Router();

r.post("/sign-in", express.json(), async (req, res) => {
  const credentials = req.body;
  if (credentials) {
    try {
      if (credentials.userName === "" || credentials.password === "") {
        return res.status(400).json("Invalid input");
      }

      const signInResult = await signIn(
        credentials.userName,
        credentials.password
      );
      if (signInResult) {
        const token = jwt.sign({ userName: credentials.userName }, secretKey, {
          expiresIn: "24h",
        });
        return res.status(200).json({ jwt: token });
      } else {
        return res
          .status(400)
          .json("Wrong username or password. Please try again");
      }
    } catch (err) {
      onsole.error("Error:", err);
      res.status(500).json("Internal Server Error");
    }
  }
});

module.exports = r;
