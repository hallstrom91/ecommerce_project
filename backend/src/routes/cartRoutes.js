const express = require("express");
const router = express.Router();

const { saveCart, retriveSavedCart } = require("../services/cartService");
/*
===============================================
POST - Cart Routes
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

/*
===============================================
GET - Cart Routes
===============================================
*/

// Collect saved carts from DB
router.get("/retrive/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const retriveCarts = await retriveSavedCart(userId);
    res.json(retriveCarts);
  } catch (error) {
    console.error("Failed to retrive saved cart", error);
    res.status(500).json({ error: "Failed to retrive saved cart." });
  }
});

module.exports = router;
