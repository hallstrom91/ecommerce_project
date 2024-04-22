/*
===============================================
Setup / Import
===============================================
*/

const express = require("express");
const router = express.Router();

// import functions to fetch category/items etc.
const {
  collectCategories,
  productsByCategoryId,
  fetchAllProducts,
  productsByIdOrName,
  productsByName,
  productsByCategoryName,
} = require("../services/productService.js");

/*
===============================================
Get all categories
===============================================
*/

router.get("/categories", async (req, res) => {
  try {
    const categories = await collectCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

/*
===============================================
Get all products in specific category
===============================================
*/

router.get("/categories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const products = await productsByCategoryId(id);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
});

/*
===============================================
Get all products
===============================================
*/

router.get("/products", async (req, res) => {
  try {
    const products = await fetchAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Failed to fetch all products", error);
    res.status(500).json({ error: "Failed to fetch all products" });
  }
});

/*
===============================================
Get products by name or category-name (search)
===============================================
*/

router.get("/products/:nameOrCategory", async (req, res) => {
  const { nameOrCategory } = req.params;

  try {
    let products = await productsByName(nameOrCategory);
    // if no results, check category name / result
    if (products.length === 0) {
      products = await productsByCategoryName(nameOrCategory);
    }
    res.json(products);
  } catch (error) {
    console.error("Failed to find products by name or category", error);
    res
      .status(500)
      .json({ error: "Failed to fetch product by name or cateogory" });
  }
});

/*
===============================================
Router Export
===============================================
*/

module.exports = router;
