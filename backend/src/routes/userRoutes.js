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
  updateUserDetails,
} = require("../services/userService.js");

/*
===============================================
GET - Endpoint UserPage (Customer)
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
POST - Endpoint Login
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
        message: "Användaren kunde inte hittas. Försök igen.",
      });
    }

    // assign JWT to user at login
    const token = await signJWT(user);

    // add token to response ? remove ?
    return res.status(200).json({
      success: true,
      message: "Inloggning lyckades.",
      token: token,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Inloggningen misslyckades. Försök igen.",
    });
  }
});

/*
===============================================
POST - Endpoint Registration
===============================================
*/

// Endpoint for registration
router.post("/register", async (req, res) => {
  const { name, username, email, password, address, city, postalCode } =
    req.body;

  try {
    // require username to register
    if (!username) {
      return res
        .status(400)
        .json({ success: false, message: "Ange ett användarnamn." });
    }

    // validate Email against regex
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Ogiltigt email format. Försök igen.",
      });
    }
    // validate Password against regex
    if (!validatePasswordStrength(password)) {
      return res.status(400).json({
        success: false,
        message: "Lösenord är inte i giltigt format. Försök igen.",
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
        .json({ success: true, message: "Användaren har registrerats." });
    } else {
      return res.status(400).json({
        success: false,
        message: "Misslyckad registrering av användare.",
      });
    }
  } catch (error) {
    console.error("Failed to register user.", error);
    res
      .status(400)
      .json({ success: false, message: "Failed to register user." });
  }
});

/*
===============================================
PUT - Endpoint Update Information
===============================================
*/

// Endpoint for updating saved information about user delivery address
router.put("/update/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { userDetails } = req.body;

  try {
    // execute update query
    await updateUserDetails(userId, userDetails);

    res.status(200).send("User credentials updated successfully.");
  } catch (error) {
    console.error("Failed to update user credentials.", error);
    res.status(500).send("Failed to update user credentials.");
  }
});

/*
===============================================
Router Export
===============================================
*/

module.exports = router;
