const { getUserId } = require("../entities/Users");
const { secretKey } = require("../services/JWT");

const jwt = require("jsonwebtoken");

async function tokenVerification(token, res) {
  if (!token) {
    return res.status(400).json("Unauthorized");
  }
  const decodedToken = jwt.verify(token, secretKey);

  try {
    const userId = await getUserId(decodedToken.userName);

    if (!userId) {
      return res.status(401).json("User not found");
    }
    return userId;
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json("Internal Server Error");
  }
}

module.exports = {
  tokenVerification,
};
