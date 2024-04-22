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
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw new Error("Failed to fetch cateogories");
  }
}

/*
===============================================
Fetch all products in specific category
===============================================
*/
async function productsByCategoryId(id) {
  const query = "SELECT * FROM products WHERE category_id = ?";
  try {
    const [rows, fields] = await pool.execute(query, [id]);
    const productsById = rows;
    return productsById;
  } catch (error) {
    console.error("Failed to fetch products by category id", error);
    throw new Error("Failed to fetch products by category id");
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
    return products;
  } catch (error) {
    console.error("Failed to fetch all products", error);
    throw new Error("Failed to fetch all products");
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
Fetch (search) products by name / category name
===============================================
*/
// search products by name
async function productsByName(name) {
  const query = "SELECT * FROM products WHERE name LIKE ?";
  const search = "%" + name + "%";
  try {
    const [rows, fields] = await pool.execute(query, [search]);
    return rows;
  } catch (error) {
    console.error("Failed to find products by name", error);
    throw new Error("Failed to find products by name");
  }
}

// search products by cateogory name
async function productsByCategoryName(categoryName) {
  const query = `
  SELECT p.*
  FROM products p
  JOIN categories c ON p.category_id = c.id
  WHERE REPLACE(c.name, '-', '') LIKE ?
  `;
  const search = "%" + categoryName + "%";
  try {
    const [rows, fields] = await pool.execute(query, [search]);
    return rows;
  } catch (error) {
    console.error("Failed to find products by category name", error);
    throw new Error("Failed to find products by category name");
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
  productsByName,
  productsByCategoryName,
};
