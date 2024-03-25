import { useReducer } from "react";
import CartContext from "../context/CartContext";
import CartReducer, { sumItems } from "../context/CartReducer";

const CartState = ({ children }) => {
  // init state of Cart - empty
  const initialState = {
    cartItems: [],
    checkout: false,
  };

  // setup reducer
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = (payload) => {
    dispatch({ type: "ADD_TO_CART", payload });
  };

  const increase = (payload) => {
    dispatch({ type: "INCREASE", payload });
  };

  const decrease = (payload) => {
    dispatch({ type: "DECREASE", payload });
  };

  const removeFromCart = (payload) => {
    dispatch({ type: REMOVE_ITEM, payload });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleCheckout = () => {
    dispatch({ type: "CHECKOUT" });
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
        ...state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
