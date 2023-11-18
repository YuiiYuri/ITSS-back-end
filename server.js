const GetTasks = require("./handlers/GetTasks");
const SignUp = require("./handlers/authentication/SignUp");
const SignIn = require("./handlers/authentication/SignIn");

const express = require("express");

const app = express();
const port = 3000;

try {
  app.use(SignUp);
  app.use(SignIn);

  app.use(GetTasks);
} catch (error) {
  console.log("error", error);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
