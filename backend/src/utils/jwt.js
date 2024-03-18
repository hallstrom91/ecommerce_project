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
  /*   const expiresIn = "2h"; */

  const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

  return token;
};

/*
===============================================
JWT - validateJWT Function to validate user
===============================================
*/

// if needed, collect more info about user to show in Frontend.
const validateJWT = async (token) => {
  console.log("validateJWT", token);
  const secretKey = process.env.JWT_SECRET;
  try {
    // decode token and get payload-info
    const decodeJWT = jwt.verify(token, secretKey);
    const userId = decodeJWT.sub;
    console.log("userId-JWT", userId);

    // collect more info about user
    const userInfo = await collectInfobyId(userId);

    return userInfo;
  } catch (error) {
    console.error("Failed to verify token or find user.", error);
    throw error;
  }
};

module.exports = {
  signJWT,
  validateJWT,
};
