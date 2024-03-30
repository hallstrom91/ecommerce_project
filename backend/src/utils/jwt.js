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
/* const validateJWT = async (token) => {
  // remove ? console.log("validateJWT", token); ??
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
}; */

// Try 1 - to handle error codes when token expires and display to user
const validateJWT = async (token) => {
  // remove ? console.log("validateJWT", token); ??
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
    if (error.name === "TokenExpiredError") {
      throw new Error(JSON.stringify({ error: "JWT Expired" }));
    } else if ((error.name = "JsonWebTokenError")) {
      throw new Error(JSON.stringify({ error: "Invalid JWT" }));
    } else {
      throw new Error(
        JSON.stringify({ error: "Failed to verify token or find user" })
      );
    }
    console.error("Failed to verify token or find user.", error);
  }
};

/*
===============================================
JWT - Collect userId for use in Cart functions
===============================================
*/

const userIdFromToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // if token found, extract userId
  if (token) {
    try {
      const decoded = await validateJWT(token);
      req.user = {
        id: decoded.id,
      };
      console.log("userId", req.user.id);
      next();
    } catch (error) {
      console.error("Invalid token", error);
      res.status(401).json({ error: "Invalid or expired token" });
    }
  } else {
    res.status(401).json({ error: "Missing token" });
  }
};

// Export

module.exports = {
  signJWT,
  validateJWT,
  userIdFromToken,
};
