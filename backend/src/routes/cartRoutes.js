const app = require("../server.js");
const express = require("express");
const router = express.Router();
const { validateJWT } = require("../utils/jwt.js");
const cookieParser = require("cookie-parser");
// import cart-query-functions
const {
  addProductToCart,
  removeFromCart,
  increaseProduct,
  decreaseProduct,
  displayCartProducts,
  clearCart,
  cartSummary,
} = require("../services/cartService.js");

/*
===============================================
POST Routes - Registered Users 
===============================================
*/
// route to add product to cart
router.post("/add", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // call function to execute query
    const result = await addProductToCart(userId, productId, quantity);

    // if success, send response
    res.status(200).json(result);
  } catch (error) {
    console.error("Failed to add product to cart", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// route to delete product from cart
router.delete("/remove/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;
    await removeFromCart(userId, productId);
    res.status(200).json({ message: "Produkten är borttagen." });
  } catch (error) {
    console.error("Failed to remove product from cart", error);
    res.status(500).json({ error: "Server Error. Failed to remove product." });
  }
});

// route to increase product by +1
router.put("/increase", async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;
    const result = await increaseProduct(userId, productId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Failed to increase product quantity.", error);
    res.status(500).json({ error: "Failed to increase product quantity" });
  }
});

// route to decrease product by -1
router.put("/decrease", async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;
    const result = await decreaseProduct(userId, productId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Failed to decrease product quantity", error);
    res.status(500).json({ error: "Failed to decrese product quantity" });
  }
});

// route to display all products in cart
router.get("/show", async (req, res) => {
  try {
    const userId = req.user.id;
    const displayCart = await displayCartProducts(userId);
    res.status(200).json(displayCart);
  } catch (error) {
    console.error("Failed to fetch cart products", error);
    res.status(500).json({ error: "Failed to fetch cart products" });
  }
});

// route to empty / delete all products in cart
router.delete("/clear", async (req, res) => {
  try {
    const userId = req.user.id;
    await clearCart(userId);
    res.status(200).json({ message: "Cart cleared." });
  } catch (error) {
    console.error("Failed to clear cart", error);
    res.status(500).json({ error: "Failed to get cart summary" });
  }
});

// route for cart summary
router.get("/summary", async (req, res) => {
  try {
    const userId = req.user.id;
    const cartSum = await cartSummary(userId);
    res.status(200).json(cartSum);
  } catch (error) {
    console.error("Failed to get cart summary", error);
    res.status(500).json({ error: "Failed to get cart summary" });
  }
});
/*
===============================================
Guest Users - Fix Later - Not done - Routes
===============================================
*/

// endpoint for non-register users
/* router.post("/guest", async (req, res) => {
  const userCookie = req.cookies.sessionId;
  console.log("User Session-Cookie:", userCookie);
  try {
    const sessionId = req.session.userId;
    console.log("sessionid cart-routes:", sessionId);
    const { productId, quantity } = req.body;
    const result = await addToCartGuest(sessionId, productId, quantity);
    res.status(200).json(result);
  } catch (error) {
    console.error("Failed to add products to cart (guest)", error);
    res
      .status(500)
      .json({ error: "Server Error, failed to add product to guest-cart." });
  }
}); */

module.exports = router;
