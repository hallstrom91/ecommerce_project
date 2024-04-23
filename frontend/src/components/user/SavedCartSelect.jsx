import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  ListGroup,
} from "react-bootstrap";

// Cart Provider
import { useCart } from "@provider/CartProvider";

export default function SavedCartSelect({ user }) {
  const [getSavedCarts, setGetSavedCarts] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  // Cart Functions
  const { retriveSavedCart, cartItems, deleteSavedCart } = useCart();

  // function to restore specific saved cart from DB to Cart
  // and not add duplicated products in cart, but increase quantity instead
  const restoreCart = (cartItemsRestore) => {
    const currentCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    cartItemsRestore.forEach((restoreItem) => {
      const existingItem = currentCart.findIndex(
        (item) => item.product_id === restoreItem.product_id
      );

      if (existingItem !== -1) {
        currentCart[existingItem].quantity += restoreItem.quantity;
      } else {
        currentCart.push(restoreItem);
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(currentCart));
    window.location.reload();
  };

  // delete saved cart from DB
  const handleDeleteSavedCart = async (cartKey) => {
    try {
      const data = await deleteSavedCart(cartKey);

      setSuccessMsg("Sparad varukorg borttagen");

      setTimeout(() => {
        setSuccessMsg("");
        window.location.reload();
      }, 3000);
    } catch (error) {
      // add logger
      setError("Varukorg kunde inte tas bort.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  // collect saved shopping carts for user
  useEffect(() => {
    const fetchSavedCarts = async () => {
      const userId = user.id;
      try {
        const data = await retriveSavedCart(userId);

        //group items based on cart_key
        const groupItems = data.reduce((acc, cart) => {
          const cartKey = cart.cart_key;
          if (!acc[cartKey]) {
            acc[cartKey] = [];
          }
          acc[cartKey].push(cart);
          return acc;
        }, {});
        // save grouped cart items
        setGetSavedCarts(groupItems);
      } catch (error) {
        // add logger
      }
    };
    fetchSavedCarts();
  }, [user.id, retriveSavedCart]);

  if (Object.keys(getSavedCarts).length === 0) {
    return (
      <div>
        <p className="fs-4 fw-bold">Här var det tomt.</p>
        <p className="fs-5">Spara någon varukorg, för framtida köp?</p>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col className="text-center">
          {successMsg && <p className="text-black">{successMsg}</p>}
          {error && <p className="text-black">{error}</p>}
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            <ListGroup.Item
              disabled
              className="text-center text-white list-group-header"
            >
              <strong className="fs-5">Sparade Varukorgar</strong>
            </ListGroup.Item>
            {Object.keys(getSavedCarts).map((cartKey) => {
              // get last five of UUID for cartId
              const savedCartId = cartKey.slice(-5);
              const savedCartItems = getSavedCarts[cartKey];
              const totalPrice = savedCartItems.reduce(
                (total, item) => total + parseFloat(item.price) * item.quantity,
                0
              );
              const totalQuantity = savedCartItems.reduce(
                (total, item) => total + item.quantity,
                0
              );

              return (
                <ListGroup.Item as="div" key={cartKey}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="w-60">
                      <strong>ID: </strong>
                      {savedCartId}
                    </div>
                    <div className="w-60">
                      <strong>Antal: </strong>
                      {totalQuantity}st
                    </div>
                    <div className="w-60">
                      <strong>Summa: </strong>
                      {totalPrice}kr
                    </div>
                    {/* button div for restore / delete saved carts */}
                    <div className="d-flex align-items-center">
                      <div className="px-1">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => restoreCart(savedCartItems)}
                        >
                          Återställ
                        </Button>
                      </div>

                      <div>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDeleteSavedCart(cartKey)}
                        >
                          Radera
                        </Button>
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              );
            })}
            <ListGroup.Item className="pt-2 text-center">
              <strong className="fs-6">
                Här kan du återställa sparade varukorgar.
              </strong>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
