const SignUp = require("./handlers/authentication/SignUp");
const SignIn = require("./handlers/authentication/SignIn");
const GetTasks = require("./handlers/tasks/Get");
const CreateTask = require("./handlers/tasks/Create");
const DeleteTask = require("./handlers/tasks/Delete");
const EditTask = require("./handlers/tasks/Edit");

const express = require("express");

const app = express();
const port = 3000;

try {
  app.use(SignUp);
  app.use(SignIn);

  app.use(GetTasks);
  app.use(CreateTask);
  app.use(DeleteTask);
  app.use(EditTask);
} catch (err) {
  console.log("error", err);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
