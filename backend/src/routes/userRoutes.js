/*
===============================================
Setup / Import
===============================================
*/

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// import jwt functions (sign and verify)
const { signJWT, validateJWT } = require("../utils/jwt.js");

// import regex-functions
const {
  validateEmail,
  validatePasswordStrength,
} = require("../utils/regex.js");

//import functions to verify user, add user to DB and collect user info.
const {
  collectInfobyId,
  registerUser,
  checkUser,
} = require("../services/userService.js");

/*
===============================================
Endpoint UserPage (Customer)
===============================================
*/

// GET-route based on token verificaiton by sub/id

router.get("/customer", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.slice(7);

  try {
    const userInfo = await validateJWT(token);
    res.status(200).json(userInfo);
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Internal Server Error";

    if (error.message.includes("Invalid Expired")) {
      statusCode = 401;
      errorMessage = "JWT Expired";
    } else if (error.message.includes("Invalid JWT")) {
      statusCode = 401;
      errorMessage = "Invalid JWT";
    }
    console.error("Failed to fetch user information", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch user information." });
  }
});

/*
===============================================
Endpoint Login
===============================================
*/
// user - testadmin / pw - Testadmin@1
// user - adminadmin - pw - Adminadmin@1

// Endpoint for login
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await checkUser(username, password);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials. User not found.",
      });
    }

    // assign JWT to user at login
    const token = await signJWT(user);
    //log token
    console.log("token", token);

    // add token to response ? remove ?
    return res.status(200).json({
      success: true,
      message: "Login Successfull.",
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Login failed. Try again later." });
  }
});

/*
===============================================
Endpoint Registration
===============================================
*/

// Endpoint for registration
router.post("/register", async (req, res) => {
  const { name, username, email, password, address, city, postalCode } =
    req.body;

  try {
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format. Try again." });
    }

    if (!validatePasswordStrength(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Minimum length is 8. Must include at least ONE lowercase & uppercase lettter. ONE digit (0-9) & ONE special character among @$!%*?&",
      });
    }
    const validateSuccess = await registerUser({
      name,
      username,
      password,
      email,
      address,
      city,
      postalCode,
    });
    if (validateSuccess) {
      return res
        .status(200)
        .json({ success: true, message: "User has been registered." });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to register user. Try again later.",
      });
    }
  } catch (error) {
    console.error("Failed to register user.", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to register user." });
  }
});

/*
===============================================
Router Export
===============================================
*/

module.exports = router;
