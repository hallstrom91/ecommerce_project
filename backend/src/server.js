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

// Endpoints User
const userRoutes = require("./routes/userRoutes");
// Endpoints Store
const productRoutes = require("./routes/productRoutes");
// Endpoints Cart
const cartRoutes = require("./routes/cartRoutes");
// Endpoints Checkout
const checkoutRoutes = require("./routes/checkoutRoutes");

/*
===============================================
Setup - APP & PORT
===============================================
*/
const app = express();
const PORT = process.env.PORT || 3000;

// static folder for image display related to products
app.use("/images", express.static(path.join(__dirname, "../images")));

// Allow cors to communicate with all servers
const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:3306",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// host static build (for vps)
app.use(express.static(path.join(__dirname, "dist")));

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

// use endpoints in userRoutes.js /user/ENDPOINT
app.use("/user", userRoutes);

// use endpoints in productRoutes.js /categories/ENDPOINT
app.use("/store", productRoutes);

// use endpoints in cartRoutes.js /cart/ENDPOINT
app.use("/cart", cartRoutes);

// use endpoints in checkoutRoutes /checkout/ENDPOINT
app.use("/checkout", checkoutRoutes);

// static build (for vps)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

/*
===============================================
App Listen & Export
===============================================
*/

app.listen(PORT, () => {
  console.log(`Backend API is live on PORT:${PORT}`);
});

module.exports = app;
