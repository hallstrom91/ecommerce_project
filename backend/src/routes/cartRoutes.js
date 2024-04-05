const express = require("express");
const router = express.Router();

const {
  saveCart,
  retriveSavedCart,
  deleteSavedCart,
} = require("../services/cartService");
/*
===============================================
POST - Cart Routes - Save Cart
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
GET - Cart Routes - Retrive Saved Carts
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

/*
===============================================
DELETE - Cart Routes - Delete Saved Carts
===============================================
*/

router.delete("/delete/:cartKey", async (req, res) => {
  const cartKey = req.params.cartKey;
  try {
    await deleteSavedCart(cartKey);
    res.status(200).send("Saved cart deleted.");
  } catch (error) {
    console.error("Failed to delete saved cart", error);
    res.status(500).send("Failed to delete saved cart.");
  }
});

module.exports = router;
