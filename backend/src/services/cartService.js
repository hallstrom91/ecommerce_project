const app = require("../server.js");
const express = require("express");

// import database connection / config
const pool = require("../utils/dbPool.js");

// UUID for cartKey
const { v4: uuidv4 } = require("uuid");

/*
===============================================
Saved User Carts (SAVE, RETRIVE & DELETE)
===============================================
*/

// save products from Cart to DB (registered users)
async function saveCart(userId, saveCartItems) {
  const cartKey = uuidv4();
  const query =
    "INSERT INTO shopping_carts (cart_key, user_id, product_id, quantity) VALUES (?, ?, ?, ?)";
  try {
    // loop thru all products in cart and save
    for (const item of saveCartItems) {
      const { id, quantity } = item;
      // execute query
      await pool.execute(query, [cartKey, userId, id, quantity]);
    }
  } catch (error) {
    console.error("Failed to save cart", error);
    throw new Error("Failed to save cart.", error);
  }
}

//Collect saved carts from DB (registered users)
async function retriveSavedCart(userId) {
  const query = `
  SELECT
  sc.cart_key,
  sc.product_id,
  sc.quantity,
  p.*
FROM
  shopping_carts sc
JOIN
  products p ON sc.product_id = p.id
WHERE
  sc.user_id = ?
  ORDER BY
  sc.cart_key, sc.product_id
  `;
  try {
    const [rows] = await pool.execute(query, [userId]);
    return rows;
  } catch (error) {
    console.error("Failed to fetch saved cart.", error);
    throw new Error("failed to fetch saved cart", error);
  }
}

// Delete saved carts from DB
async function deleteSavedCart(cartKey) {
  const query = "DELETE FROM shopping_carts WHERE cart_key = ?";
  try {
    await pool.execute(query, [cartKey]);
    console.log("Saved Cart deleted successfully.");
  } catch (error) {
    console.error("Failed to delete saved cart", error);
    throw new Error("Failed to delete saved cart", error);
  }
}

// export

module.exports = { saveCart, retriveSavedCart, deleteSavedCart };
