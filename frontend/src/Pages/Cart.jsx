import React from "react";
import ItemDetails from "../Components/ItemDetails";
import { useSelector } from "react-redux";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <>
      <div className="p-5">
        <h2>Shopping Cart</h2>
        <Row>
          <Col>
            {cartItems.map((cartItem) => (
              <ItemDetails key={cartItem._id} cartItem={cartItem} />
            ))}
          </Col>
          <Col>
            <Card style={{ width: "25rem" }} className="p-5 ms-5 shadow">
              <Card.Body>
                <Card.Title>
                  Subtotal ({cartItems.length}){" "}
                  {cartItems.length > 1 ? "Items" : "Item"}
                </Card.Title>
                <Card.Text>
                  $
                  {cartItems.reduce(
                    (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
                    0
                  )}{" "}
                </Card.Text>
                <hr />
                <Button
                  variant="success"
                  onClick={() => {
                    navigate("/shipping");
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Cart;
