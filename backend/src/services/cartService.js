const app = require("../server.js");
const express = require("express");

// import database connection / config
const pool = require("../utils/dbPool.js");

/*
===============================================
Save User Cart to DB
===============================================
*/
/* async function saveCart(userId, cartItems) {
  //query to save cart to DB
  const saveQuery =
    "INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)";
  // query to verify users id
  const verfiyQuery = "SELECT * FROM users where id = ?";
  try {
    // execute query to verify user id
    const [rows] = await pool.execute(verfiyQuery, [userId]);

    if (rows.length === 0) {
      return res.status(400).json({
        error: "Invalid user ID. Please sign up or login to save cart.",
      });
    }

    // loop thru all products in cart and save
    for (const item of cartItems) {
      const { productId, quantity } = item;
      // execute query
      await pool.execute(query, [userId, productId, quantity]);
    }
  } catch (error) {
    console.error("Failed to save cart", error);
    throw new Error("Failed to save cart.", error);
  }
} */

async function saveCart(userId, saveCartItems) {
  const query =
    "INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)";
  try {
    // loop thru all products in cart and save
    for (const item of saveCartItems) {
      const { id, quantity } = item;
      // execute query
      await pool.execute(query, [userId, id, quantity]);
    }
  } catch (error) {
    console.error("Failed to save cart", error);
    throw new Error("Failed to save cart.", error);
  }
}

// export

module.exports = { saveCart };
