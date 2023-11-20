const db = require("../services/SetUpMySQL");

async function signIn(mail, password) {
  const query =
    "SELECT COUNT(*) AS count from users WHERE mail = ? and password = ?;";

  return new Promise((resolve, reject) => {
    db.query(query, [mail, password], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].count > 0);
      }
    });
  });
}

module.exports = {
  signIn,
};
