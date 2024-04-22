const app = require("../server.js");
const jwt = require("jsonwebtoken");

const {
  collectInfobyId,
  registerUser,
  checkUser,
} = require("../services/userService.js");

/*
===============================================
JWT - SignJWT Function at Login
===============================================
*/

// sign JWT to user at login
const signJWT = (user) => {
  // sign userinfo in payload
  const payload = {
    sub: user.id,
    name: user.name,
    user: user.username,
  };
  const secretKey = process.env.JWT_SECRET;
  // token expires in 1min - to check auth function in frontend
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return token;
};

/*
===============================================
JWT - validateJWT Function to validate user
===============================================
*/

// if needed, collect more info about user to show in Frontend.
const validateJWT = async (token) => {
  // remove ? console.log("validateJWT", token); ??
  const secretKey = process.env.JWT_SECRET;
  try {
    // decode token and get payload-info
    const decodeJWT = jwt.verify(token, secretKey);
    const userId = decodeJWT.sub;
    console.log(`validateJWT - userId from JWT: ID ${userId}`);

    // collect more info about user
    const userInfo = await collectInfobyId(userId);

    return userInfo;
  } catch (error) {
    console.error("Failed to verify token or find user.", error);
    throw error;
  }
};

// Export

module.exports = {
  signJWT,
  validateJWT,
};
