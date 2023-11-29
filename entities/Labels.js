const db = require("../services/SetUpMySQL");

async function createLabel(label, user_id) {
  const query = `   INSERT INTO label ( 
                      label_name, 
                      color, 
                      user_id) 
                    VALUES (?, ?, ?);`;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [label.label_name, label.color, user_id],
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

async function getLabels(user_id) {
  const query = `   SELECT *    
                    FROM label
                    WHERE user_id = ?;`;

  return new Promise((resolve, reject) => {
    db.query(query, [user_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function editLabel(label, user_id) {
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
      [label.label_name, label.color, user_id, label.label_id],
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

async function deleteLabel(label_id, user_id) {
  const query = ` DELETE FROM label
                  WHERE 
                    label_id = ? AND 
                    user_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(query, [label_id, user_id], (err, results) => {
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
