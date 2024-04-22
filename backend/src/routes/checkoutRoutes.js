const express = require("express");
const router = express.Router();

// import functions
const { confirmOrder } = require("../services/checkoutService");

/*
===============================================
POST - Checkout Routes
===============================================
*/

router.post("/confirm", async (req, res) => {
  const { userId, orderDetails, cardDetails } = req.body;
  try {
    const orderId = await confirmOrder(userId, orderDetails, cardDetails);
    res
      .status(200)
      .json({ success: true, message: "Order Confirmed.", orderId });
  } catch (error) {
    console.error("Order is not confirmed.", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to confirm order." });
  }
});

// export
module.exports = router;
