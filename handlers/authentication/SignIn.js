const { signIn } = require("../../entities/SignIn");
const { getUserNameAndImage } = require("../../entities/Users");
const { secretKey } = require("../../services/JWT");

const Router = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const r = Router();

r.post("/sign-in", express.json(), async (req, res) => {
  const credentials = req.body;
  if (credentials) {
    try {
      if (credentials.mail === "" || credentials.password === "") {
        return res.status(400).json("Invalid input");
      }

      const signInResult = await signIn(credentials.mail, credentials.password);
      if (signInResult) {
        const userData = await getUserNameAndImage(credentials.mail);
        const token = jwt.sign(
          { userName: userData.user_name, avatar: userData.image },
          secretKey,
          {
            expiresIn: "24h",
          }
        );
        return res.status(200).json({ jwt: token });
      } else {
        return res
          .status(400)
          .json("Wrong username or password. Please try again");
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json("Internal Server Error");
    }
  }
});

module.exports = r;
