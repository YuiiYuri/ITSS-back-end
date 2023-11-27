const SignUp = require("./handlers/authentication/SignUp");
const SignIn = require("./handlers/authentication/SignIn");

const GetTasks = require("./handlers/tasks/Get");
const CreateTask = require("./handlers/tasks/Create");
const DeleteTask = require("./handlers/tasks/Delete");
const EditTask = require("./handlers/tasks/Edit");

const GetFilters = require("./handlers/filters/Get");
const CreateFilter = require("./handlers/filters/Create");

const GetLabels = require("./handlers/labels/Get");
const CreateLabel = require("./handlers/labels/Create");

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

  app.use(GetFilters);
  app.use(CreateFilter);

  app.use(GetLabels);
  app.use(CreateLabel);
} catch (err) {
  console.log("error", err);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
