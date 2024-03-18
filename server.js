// nodejs server to handle endpoints, sql & users

/*
===============================================
Import 
===============================================
*/
import express from "express";
import path from "path";
import dotenv from "dotenv/config";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import cors from "cors";
import helmet from "helmet";
import jwt from "jsonwebtoken";

/*
===============================================
Setup - APP & PORT
===============================================
*/
const app = express();
const PORT = process.env.PORT || 3000;
app.use(helmet());
app.use(cors());
app.use(express.json());

/*
===============================================
Database Pool Connection
===============================================
*/

// Create Pool-connection to SQL-database to handle multiple requests (10)
const pool = mysql.createPool({
  connectionLimit: process.env.DB_CONNECT_LIMIT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

/*
===============================================
JSON Web Token Function
===============================================
*/

// sign JWT to user at login
const signJWT = (userInfo) => {
  // sign userinfo in payload
  const payload = {
    id: userInfo.id,
    username: userInfo.username,
  };
  const secretKey = process.env.JWT_SECRET;
  /*   const expiresIn = "2h"; */

  const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

  return token;
};

// if needed, collect more info about user to show in Frontend.
const validateJWT = async (token) => {
  const secretKey = process.env.JWT_SECRET;
  try {
    // decode token and get payload-info
    const decodeJWT = jwt.verify(token, secretKey);
    const userId = decodeJWT.id;

    // collect more info about user
    const userInfo = await collectInfobyId(userId);

    return userInfo;
  } catch (error) {
    console.error("Failed to verify token or find user.", error);
    throw error;
  }
};

/*
===============================================
Password & Email Regex Function
===============================================
*/
// Email Regex
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password Regex
/* * - Minimum length of 8 characters.
 * - Must include at least one lowercase letter.
 * - Must include at least one uppercase letter.
 * - Must include at least one digit (0-9).
 * - Must include at least one special character among @$!%*?&. */
const validatePasswordStrength = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

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

    // if match, succes. If not, denied.
    return match ? user : null;
  } catch (error) {
    console.error("Failed to check user.", error);
    throw error;
  }
}

/*
===============================================
Endpoint UserPage/Customer
===============================================
*/

app.get("/customer", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const userInfo = await validateJWT(token);
    res.status(200).json(userInfo);
  } catch (error) {
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
app.post("/login", async (req, res) => {
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
    const token = signJWT(user);
    console.log("token", token);

    return res
      .status(200)
      .json({ success: true, message: "Login Successfull." });
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
app.post("/register", async (req, res) => {
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
App Listen
===============================================
*/

app.listen(PORT, () => {
  console.log(`Backend API is live on PORT:${PORT}`);
});

/*
===============================================
OLD CODE - REMOVE?
===============================================
*/

// Endpoint to register - working
/* app.post("/register", async (req, res) => {
  // collect values from registration-form in Frontend
  const { name, username, email, password, address, city, postal_code } =
    req.body;

  // check email - with regex function
  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email." });
  }
  // check password strength with regex function
  if (!validatePasswordStrength(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Minimum length is 8. Must include at least ONE lowercase & uppercase lettter. ONE digit (0-9) & ONE special character among @$!%*?&",
    });
  }

  // bcrypt salt-rounds (default)
  const saltRounds = 10;
  // create password-salt for user - to store separate
  const passwordSalt = await bcrypt.genSalt(saltRounds);

  try {
    //  add salt to password - stored together
    const hashedPassword = await bcrypt.hash(password, passwordSalt);

    // query for SQL database.
    const query =
      "INSERT INTO users (name, username, email, hashed_password, password_salt, address, city, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    // Values to add to database, after password is hashed.
    const values = [
      name,
      username,
      email,
      hashedPassword,
      passwordSalt,
      address,
      city,
      postal_code,
    ];

    // Register user to database
    await pool.query(query, values);

    // success message
    res
      .status(200)
      .json({ success: true, message: "User has been registered." });

    // if any error with database registration, show error.
  } catch (error) {
    console.error("Failed to register user", error);
    res.status(500).json({
      success: false,
      message: "Failed to register user, try again later.",
    });
  }
}); */
