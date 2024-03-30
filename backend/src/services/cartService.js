const app = require("../server.js");
const pool = require("../utils/dbPool.js");

/*
===============================================
Registered Users - Cart Functions
===============================================
*/
// Add product to cart - query function
const addProductToCart = async (userId, productId, quantity) => {
  try {
    // SQL query to add product to users cart
    const addToCartQuery =
      "INSERT into user_carts (user_id, product_id, quantity) VALUES (?, ?, ?)";

    // execute query
    const [results] = await pool.execute(addToCartQuery, [
      userId,
      productId,
      quantity,
    ]);

    // success message
    return { message: "Produkten är tillagd i kundkorgen." };
  } catch (error) {
    throw new Error("Failed to att product to cart.");
  }
};

// Delete product from cart - query function
const removeFromCart = async (userId, productId) => {
  try {
    // SQL query to remove product from cart
    const deleteQuery =
      "DELETE FROM user_carts WHERE user_id = ? AND product_id = ?";

    // execute query
    await pool.execute(deleteQuery, [userId, productId]);
  } catch (error) {
    throw new Error(error);
  }
};

// Increase product quantity in cart by ONE (+1)
const increaseProduct = async (userId, productId) => {
  try {
    const increaseProductQuery =
      "UPDATE user_carts SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?";
    await pool.execute(increaseProductQuery, [userId, productId]);
    //return message if success
    return { message: "Product quantity increased." };
  } catch (error) {
    throw new Error(error);
  }
};

// Decrease product quantity in cart by ONE (-1)
const decreaseProduct = async (userId, productId) => {
  try {
    // check quantity
    const quantityQuery =
      "SELECT quantity FROM user_carts WHERE user_id = ? AND product_id = ?";
    const [quantityRows] = await pool.execute(quantityQuery, [
      userId,
      productId,
    ]);
    const currentQuantity = quantityRows[0].quantity;
    // if quantity goes below 1, delete from DB.
    if (currentQuantity <= 1) {
      const decreaseDelete =
        "DELETE FROM user_carts WHERE user_id = ? AND product_id = ?";
      await pool.execute(decreaseDelete, [userId, productId]);
    }
    // decrease quantity
    const decreaseProductQuery =
      "UPDATE user_carts SET quantity = quantity - 1 WHERE user_id = ? AND product_id = ?";
    await pool.execute(decreaseProductQuery, [userId, productId]);

    return { message: "Product quantity decreased." };
  } catch (error) {
    throw new Error(error);
  }
};

// collect products in cart to display
const displayCartProducts = async (userId) => {
  try {
    const cartProductsQuery = `SELECT 
    user_carts.quantity,
    products.id AS product_id,
    products.name,
    products.description,
    products.price,
    products.stock,
    products.category_id,
    products.image_url
  FROM 
    user_carts
  JOIN 
    products ON user_carts.product_id = products.id
  WHERE 
    user_carts.user_id = ?;`;
    const [cartRows] = await pool.execute(cartProductsQuery, [userId]);
    return cartRows;
  } catch (error) {
    throw new Error(error);
  }
};

// clear cart
const clearCart = async (userId) => {
  try {
    const clearCartQuery = "DELETE FROM user_carts WHERE user_id = ?";
    await pool.execute(clearCartQuery, [userId]);
  } catch (error) {
    throw new Error(error);
  }
};

// calculate cart summary - fix

const cartSummary = async (userId) => {
  try {
    const cartSummaryQuery = `SELECT 
    user_carts.product_id, 
    SUM(user_carts.quantity) AS totalQuantity, 
    SUM(user_carts.quantity * products.price) AS totalProductPrice,
    products.price AS unitPrice 
  FROM 
    user_carts 
  JOIN 
    products ON user_carts.product_id = products.id 
  WHERE 
    user_carts.user_id = ?
  GROUP BY 
    user_carts.product_id`;

    const [cartSumRows] = await pool.execute(cartSummaryQuery, [userId]);

    let totalSum = 0;
    let totalQuantity = 0;
    const products = cartSumRows.map((row) => {
      const productPrice = parseFloat(row.totalProductPrice);
      const productQuantity = parseFloat(row.totalQuantity);

      totalQuantity += totalQuantity;
      totalSum += productPrice;

      return {
        productId: row.product_id,
        unitPrice: row.unitPrice,
        totalProductSum: productPrice,
        totalProductQuantity: productQuantity,
      };
    });
    // cart summary
    const cartSum = {
      totalCartSum: totalSum.toFixed(2),
      totalCartQuantity: totalQuantity,
      products: products,
    };
    return { products, cartSum };
  } catch (error) {
    throw new Error(error);
  }
};

/* const cartSummary = async (userId) => {
  try {
    const cartSummaryQuery = `SELECT 
    SUM(products.price * user_carts.quantity) AS totalSum,
    SUM(user_carts.quantity) AS totalQuantity
  FROM 
    user_carts
  JOIN 
    products ON user_carts.product_id = products.id
  WHERE 
    user_carts.user_id = ?`;
    const [cartSumRows] = await pool.execute(cartSummaryQuery, [userId]);
    const { totalSum, totalQuantity } = cartSumRows[0];
    return { totalSum, totalQuantity };
  } catch (error) {
    throw new Error(error);
  }
}; */

/*
===============================================
Guest Users - Fix Later - Not done
===============================================
*/
// Non-Registered User
/* const addToCartGuest = async (sessionId, productId, quantity) => {
  try {
    let result;
    //check if user has any saved cart

    const cartCheckQuery = "SELECT * FROM guest_carts WHERE session_id = ?";
    const [cartRows, cartFields] = await pool.execute(cartCheckQuery, [
      sessionId,
    ]);

    // create new guest_cart if non exists
    if (cartRows.length === 0) {
      console.log("No previous cart connected to user");
      //     const createCartQuery = "INSERT INTO guest_carts (session_id) VALUES (?)";
     // await pool.execute(createCartQuery, [sessionId]); 
    }

    // check if product is already in customers guest_cart
    const productCheckQuery =
      "SELECT * FROM guest_carts WHERE session_id = ? AND product_id = ?";
    const [existingProductRows, existingProductFields] = await pool.execute(
      productCheckQuery,
      [sessionId, productId]
    );
    // check if product already exists in guest_cart
    if (existingProductRows.length > 0) {
      const existingQuantity = existingProductRows[0].quantity;

      if (existingQuantity !== quantity) {
        // update quantity of product if changed
        const quantityAddQuery =
          "UPDATE guest_carts SET quantity = ? WHERE session_id = ? AND product_id = ?";

        await pool.execute(quantityAddQuery, [quantity, sessionId, productId]);
        result = { message: "Kvantiteten har uppdaters på produkten." };
      } else {
        // to block double adding of product by mistake
        result = { message: "Produkten finns redan i kundkorgen." };
      }
    } else {
      // add product and create guest_cart for user
      const addProductQuery =
        "INSERT INTO guest_carts (session_id, product_id, quantity) VALUES (?, ?, ?)";
      await pool.execute(addProductQuery, [sessionId, productId, quantity]);
      result = { message: "Produkten har lagts till i kundkorgen." };
    }

    return result;
  } catch (error) {
    throw new Error(error);
  }
}; */

module.exports = {
  addProductToCart,
  removeFromCart,
  increaseProduct,
  decreaseProduct,
  displayCartProducts,
  clearCart,
  cartSummary,
};
