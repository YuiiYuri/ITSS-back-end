const db = require("../services/SetUpMySQL");

async function signIn(userName, password) {
  const query =
    "SELECT COUNT(*) AS count from users WHERE user_name = ? and password = ?;";

  return new Promise((resolve, reject) => {
    db.query(query, [userName, password], (err, results) => {
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
  signIn,
};
