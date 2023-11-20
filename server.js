const GetTasks = require("./handlers/tasks/Get");
const CreateTask = require("./handlers/tasks/Create");
const SignUp = require("./handlers/authentication/SignUp");
const SignIn = require("./handlers/authentication/SignIn");

const express = require("express");

const app = express();
const port = 3000;

try {
  app.use(SignUp);
  app.use(SignIn);

  app.use(GetTasks);
  app.use(CreateTask);
} catch (err) {
  console.log("error", err);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
