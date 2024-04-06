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
} = require("../services/productService.js");

/*
===============================================
Get all categories
===============================================
*/

router.get("/categories", collectCategories);

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

router.get("/products", fetchAllProducts);

/*
===============================================
Get product by id or name
===============================================
*/

router.get("/products/:idOrName", async (req, res) => {
  const { idOrName } = req.params;
  console.log(idOrName);

  // check params if int or string and do search
  if (!isNaN(idOrName)) {
    const productId = parseInt(idOrName);
    // if idOrName is Int (number)
    try {
      const productById = await productsByIdOrName(productId);
      res.json(productById);
    } catch (error) {
      console.error("Failed to fetch product by id", error);
      res.status(500).json({ error: "failed to fetch product by id" });
    }
    // if idOrName is a String
  } else {
    const productName = idOrName;
    try {
      const productByName = await productsByIdOrName(productName);
      res.json(productByName);
      console.log("searchbyName", productByName);
    } catch (error) {
      console.error("Failed to fetch product by name", error);
      res.status(500).json({ error: "Failed to fetch product by name" });
    }
  }
});

/*
===============================================
Router Export
===============================================
*/

module.exports = router;
