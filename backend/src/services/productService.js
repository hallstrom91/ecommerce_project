/*
===============================================
Setup
===============================================
*/

const app = require("../server.js");
const express = require("express");

// import database connection / config
const pool = require("../utils/dbPool.js");

/*
===============================================
Fetch all categories
===============================================
*/

// Collect categories to display
async function collectCategories(req, res) {
  const query = "SELECT * FROM categories";
  try {
    const [rows, fields] = await pool.execute(query);
    const categories = rows;
    res.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

/*
===============================================
Fetch all products in specific category
===============================================
*/
async function productsByCategoryId(id, res) {
  const query = "SELECT * FROM products WHERE category_id = ?";
  try {
    const [rows, fields] = await pool.execute(query, [id]);
    const productsById = rows;
    res.json(productsById);
  } catch (error) {
    console.error("Failed to fetch products by category id", error);
    res.status(500).json({ error: "Failed to fetch products by category id" });
  }
}

/*
===============================================
Fetch all products 
===============================================
*/
async function fetchAllProducts(req, res) {
  const query = "SELECT * FROM products";
  try {
    const [rows, fields] = await pool.execute(query);
    const products = rows;
    res.json(products);
  } catch (error) {
    console.error("Failed to fetch all products", error);
    res.status(500).json({ error: "Failed to fetch all products" });
  }
}

/*
===============================================
Fetch products by id
===============================================
*/
async function productsByIdOrName(idOrName) {
  const query =
    "SELECT * FROM products WHERE id = ? OR name = ? OR name LIKE ?";
  const search = "%" + idOrName + "%";
  try {
    const [rows, fields] = await pool.execute(query, [
      idOrName,
      idOrName,
      search,
    ]);
    return rows;
  } catch (error) {
    console.error("Failed to fetch product by name or id.", error);
    res.status(500).json({ error: "Failed to fetch product by name or id" });
  }
}

/*
===============================================
Functions Export
===============================================
*/

module.exports = {
  collectCategories,
  productsByCategoryId,
  fetchAllProducts,
  productsByIdOrName,
};
