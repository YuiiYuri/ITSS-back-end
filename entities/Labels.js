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

async function editLabel(label, userId) {
  const query = ` UPDATE label
                  SET 
                    label_name = ?,
                    color = ?
                  WHERE 
                    user_id = ? AND
                    label_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [label.labelName, label.color, userId, label.labelId],
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

async function deleteLabel(labelId, userId) {
  const query = ` DELETE FROM label
                  WHERE 
                    label_id = ? AND 
                    user_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(query, [labelId, userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.affectedRows > 0);
      }
    });
  });
}

module.exports = {
  createLabel,
  getLabels,
  editLabel,
  deleteLabel,
};
