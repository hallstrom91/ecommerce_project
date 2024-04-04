const express = require("express");
const router = express.Router();

const { saveCart } = require("../services/cartService");
/*
===============================================
Cart Routes
===============================================
*/
// Route to save cart
router.post("/save", async (req, res) => {
  const { userId, saveCartItems } = req.body;
  console.log("reqbody", req.body);
  try {
    await saveCart(userId, saveCartItems);
    res.json({ message: "Cart successfully saved." });
  } catch (error) {
    console.error("Failed to save cart.", error);
    res.status(500).json({ error: "Failed to save cart." });
  }
});

module.exports = router;
