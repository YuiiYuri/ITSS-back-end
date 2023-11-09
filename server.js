const getTasks = require("./handlers/get-tasks");
const express = require("express");

const app = express();
const port = 3000;

app.use(getTasks);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
