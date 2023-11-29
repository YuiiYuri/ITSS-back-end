const db = require("../services/SetUpMySQL");

async function createFilter(filter, userId) {
  const query = ` INSERT INTO filter ( 
                    filter_name, 
                    color, 
                    user_id) 
                  VALUES (?, ?, ?);`;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [filter.filterName, filter.color, userId],
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

async function getFilters(userId) {
  const query = ` SELECT *    
                  FROM filter
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

async function editFilter(filter, userId) {
  const query = ` UPDATE filter
                  SET 
                    filter_name = ?,
                    color = ?
                  WHERE 
                    user_id = ? AND
                    filter_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [filter.filterName, filter.color, userId, filter.filterId],
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

async function deleteFilter(filterId, userId) {
  const query = ` DELETE FROM filter
                  WHERE 
                    filter_id = ? AND 
                    user_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(query, [filterId, userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.affectedRows > 0);
      }
    });
  });
}

module.exports = {
  createFilter,
  getFilters,
  editFilter,
  deleteFilter,
};
