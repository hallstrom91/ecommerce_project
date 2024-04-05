const app = require("../server.js");
const express = require("express");

// import database connection / config
const pool = require("../utils/dbPool.js");

/*
===============================================
Confirm Order 
===============================================
*/

// Function to complete order
async function confirmOrder(userId, orderDetails, CardDetails) {
  const orderQuery =
    "INSERT INTO orders (user_id, total_price, delivery_address) VALUES (?, ?, ?)";
  const orderProductQuery =
    "INSERT INTO ordered_products (order_id, product_id, product_name, unit_price, quantity) VALUES (?, ?, ?, ?, ?)";
  const cardQuery =
    "INSERT INTO payments (user_id, card_number, card_name, card_cvv) VALUES (?, ?, ?, ?)";
  try {
    // execute orderQuery
    const [orderRows] = await pool.query(orderQuery, [
      userId,
      orderDetails.totalPrice,
      orderDetails.deliveryAddress,
    ]);
    const orderId = orderRows.insertId;

    // loop products for orderProductQuery and execute query
    for (const product of orderDetails.products) {
      await pool.query(orderProductQuery, [
        orderId,
        product.id,
        product.name,
        product.price,
        product.quantity,
      ]);
    }

    // save card information
    await pool.query(cardQuery, [
      userId,
      CardDetails.cardNumber,
      CardDetails.cardName,
      CardDetails.cvv,
    ]);
  } catch (error) {
    console.error("Failed to complete order...", error);
    throw new Error("failed to complete order...", error);
  }
}

// export
module.exports = { confirmOrder };
