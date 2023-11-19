const db = require("../services/SetUpMySQL");

const moment = require("moment-timezone");

async function getTodayTasks(userId) {
  const currentDateInUTC = moment().utc().format("YYYY-MM-DD");
  const query = `SELECT * FROM tasks WHERE DATE(due_date) = '${currentDateInUTC}' AND user_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(query, [userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function createTask(task, userId) {
  const query =
    "INSERT INTO tasks (task_name, description, due_date, priority_id, label_id, user_id) VALUES (?, ?, ?, ?, ?, ?);";

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        task.taskName,
        task.description,
        task.dueDate,
        task.priorityId,
        task.labelId,
        userId,
      ],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

module.exports = {
  getTodayTasks,
  createTask,
};
