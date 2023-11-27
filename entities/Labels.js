const db = require("../services/SetUpMySQL");

async function createLabel(label, userId) {
  const query = `   INSERT INTO label ( 
                      label_name, 
                      color, 
                      user_id) 
                    VALUES (?, ?, ?);`;

  return new Promise((resolve, reject) => {
    db.query(query, [label.labelName, label.color, userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function getLabels(userId) {
  const query = `   SELECT *    
                    FROM label
                    WHERE user_id = ?;`;

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

module.exports = {
  createLabel,
  getLabels,
};
