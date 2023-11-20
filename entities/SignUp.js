const db = require("../services/SetUpMySQL");

async function signUp(userName, password, mail, role, authMethod) {
  const query =
    "INSERT INTO users (user_name, password, mail, role, auth_method) VALUES (?, ?, ?, ?, ?);";

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [userName, password, mail, role, authMethod],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          const affectedRows = results.affectedRows;
          resolve(affectedRows > 0);
        }
      }
    );
  });
}

async function isUserAlreadyRegistered(email) {
  const query = "SELECT COUNT(*) AS count FROM users WHERE mail = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        const count = results[0].count;
        resolve(count > 0);
      }
    });
  });
}

module.exports = {
  isUserAlreadyRegistered,
  signUp,
};
