// nodejs server to handle endpoints, sql & users

/*
===============================================
Import 
===============================================
*/
const express = require("express");
const path = require("path");
const dotenv = require("dotenv/config");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

// Endpoints
const userRoutes = require("./routes/userRoutes");

/*
===============================================
Setup - APP & PORT
===============================================
*/
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:3306",
    "http://localhost:5173",
  ],
};

app.use(helmet());
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// use endpoints in userRoutes.js /user/ENDPOINT
app.use("/user", userRoutes);

/*
===============================================
App Listen & Export
===============================================
*/

app.listen(PORT, () => {
  console.log(`Backend API is live on PORT:${PORT}`);
});

module.exports = app;
