import React, { useState } from "react";
import { useReducer, createContext, useContext, useEffect } from "react";
import CartReducer, { sumItems } from "./cart/CartReducer";
// create empty context-object
const CartContext = createContext();

export const CartState = ({ children }) => {
  // save/return cart at update/refresh of page
  const returnCartItemsFromStorage = () => {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  };
  // Retrive added produtcs from localStorage as init-state @ update/refresh
  const initialState = {
    cartItems: returnCartItemsFromStorage(),
    checkout: false,
    ...sumItems(returnCartItemsFromStorage()),
  };

  // setup reducer
  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // function to add product to cart
  const addToCart = (payload) => {
    dispatch({ type: "ADD_TO_CART", payload });
  };
  // function to increase existing product in cart
  const increase = (payload) => {
    dispatch({ type: "INCREASE", payload });
  };
  // function to decrease existing product in cart
  const decrease = (payload) => {
    dispatch({ type: "DECREASE", payload });
  };
  // function to remove product from cart
  const removeFromCart = (payload) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };
  // function to clear cart
  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };
  // function to handle checkout, and clear cart.
  const handleCheckout = () => {
    dispatch({ type: "CHECKOUT" });
  };

  // ↓↓ cart-related functions to backend / MySQL-DB below ↓↓

  // function to update saved user information (registered user only)
  const updateUserInfo = async (userId, userDetails) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userDetails }),
        }
      );
      if (!response.ok) {
        throw new Error("Misslyckad uppdatering av användar-uppgifter.");
      }
    } catch (error) {
      console.error("Misslyckad uppdatering av användar-uppgifter.");
      throw error;
    }
  };

  // function to search in db for products
  const [results, setResults] = useState(null);

  const searchForProducts = async (nameOrCategory) => {
    try {
      const response = await fetch(
        `http://localhost:3000/store/products/${nameOrCategory}`
      );
      if (!response.ok) {
        throw new Error("Misslyckad inhämtning av produkter");
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Misslyckad inhämtning av produkter", error);
      throw error;
    }
  };

  // Save shopping cart (registered user only)
  const saveCartToDB = async (userId, saveCartItems) => {
    try {
      const response = await fetch("http://localhost:3000/cart/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, saveCartItems }),
      });
      if (!response.ok) {
        throw new Error("Varukorgen kunde inte sparas.");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Varukorgen kunde inte sparas.", error);
      throw error;
    }
  };

  // retrive saved cart (registered user only)
  const retriveSavedCart = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/cart/retrive/${userId}`
      );
      if (!response.ok) {
        throw new Error("Kunde inte återställa varukorgen.");
      }
      const GetsavedCarts = await response.json();
      return GetsavedCarts;
    } catch (error) {
      console.error("Kunde inte återställa varukorgen.", error);
      throw error;
    }
  };

  // delete saved cart
  const deleteSavedCart = async (cartKey) => {
    try {
      const response = await fetch(
        `http://localhost:3000/cart/delete/${cartKey}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Misslyckad borttagning av sparad varukorg.");
      }
    } catch (error) {
      console.error("Misslyckad borttagning av sparad varukorg.", error);
      throw error;
    }
  };

  // Checkout, save cart, user & payment info to DB.
  const checkoutToDB = async (orderData) => {
    try {
      const response = await fetch("http://localhost:3000/checkout/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        console.log("Order bekräftad.");
      } else {
        const errorCheckout = await response.json();
        console.error("Misslyckad order.", errorCheckout.message);
      }
    } catch (error) {
      console.error("Misslyckad order.", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        showCart: state.showCart,
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        handleCheckout,
        clearCart,
        searchForProducts,
        results,
        updateUserInfo,
        saveCartToDB,
        retriveSavedCart,
        deleteSavedCart,
        checkoutToDB,
        ...state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
