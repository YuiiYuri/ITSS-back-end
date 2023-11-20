const db = require("../services/SetUpMySQL");

function getUserId(userName) {
  const query = "SELECT user_id FROM users WHERE user_name = ?;";
  return new Promise((resolve, reject) => {
    db.query(query, [userName], (err, results) => {
      if (err) {
        reject(err);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          const userId = results[0].user_id;
          resolve(userId);
        }
      }
    });
  });
}

async function getUserNameAndImage(mail) {
  const query = "SELECT user_name, image FROM users WHERE mail = ?;";
  return new Promise((resolve, reject) => {
    db.query(query, [mail], (err, results) => {
      if (err) {
        reject(err);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          resolve(results[0]);
        }
      }
    });
  });
}

module.exports = {
  getUserId,
  getUserNameAndImage,
};
