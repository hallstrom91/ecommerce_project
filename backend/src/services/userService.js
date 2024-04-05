/*
===============================================
Setup
===============================================
*/

const app = require("../server.js");
const express = require("express");
const bcrypt = require("bcrypt");

// import database connection / config
const pool = require("../utils/dbPool.js");

/*
===============================================
User by ID
===============================================
*/

// collect more info about user to show in frontend.
const collectInfobyId = async (userId) => {
  const query = "SELECT * FROM users WHERE ID = ?";
  try {
    const [rows, fields] = await pool.execute(query, [userId]);
    const userInfo = rows[0];
    return userInfo;
  } catch (error) {
    console.error("Failed to fetch user details.", error);
    throw error;
  }
};

/*
===============================================
User Registration
===============================================
*/

async function registerUser({
  name,
  username,
  password,
  email,
  address,
  city,
  postalCode,
}) {
  try {
    const saltRounds = 10;
    const passwordSalt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, passwordSalt);

    const query =
      "INSERT INTO users (name, username, hashed_password, password_salt, email, address, city, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      name,
      username,
      hashedPassword,
      passwordSalt,
      email,
      address,
      city,
      postalCode,
    ];
    // send user-info to database.
    await pool.query(query, values);
    return true;
  } catch (error) {
    console.error("Failed to register user.", error);
    throw error;
  }
}

/*
===============================================
User Verification & Information
===============================================
*/

// Validate user against stored credentials - LOGIN
async function checkUser(username, password) {
  // query for SQL database.
  const query = "SELECT * FROM users WHERE username = ?";
  try {
    // rows contains rows return from server, fields contains xtra metadata if available
    const [rows, fields] = await pool.execute(query, [username]);

    // assigns database information to variable 'user'
    const user = rows[0];

    // check if user exists in database or not.
    if (!user) {
      return null;
      console.log("User not found.");
    }

    // if user exists, compare input-password to stored hashed password & salt.
    const match = await bcrypt.compare(password, user.hashed_password);
    /*  return { match, user }; */
    // if match, succes. If not, denied.
    return match ? user : null;
  } catch (error) {
    console.error("Failed to check user.", error);
    throw error;
  }
}

/*
===============================================
Functions  Export
===============================================
*/
module.exports = {
  collectInfobyId,
  registerUser,
  checkUser,
};
