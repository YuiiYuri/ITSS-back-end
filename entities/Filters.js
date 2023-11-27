const db = require("../services/SetUpMySQL");

async function createFilter(filter, userId) {
  const query = `   INSERT INTO filter ( 
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
  const query = `   SELECT *    
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

module.exports = {
  createFilter,
  getFilters,
};
