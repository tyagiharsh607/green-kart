import React from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAddOrderMutation } from "../Redux/Slices/ordersApiSlice.js";
import { emptyCart } from "../Redux/Slices/cartSlice.js";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceorderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    shippingAddress,
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useSelector((state) => state.cart);

  const orderItems = cartItems.map((cartItem) => {
    return {
      name: cartItem.name,
      quantity: cartItem.quantity,
      image: cartItem.image,
      price: cartItem.price,
      grocery: cartItem._id,
    };
  });

  const { user } = useSelector((state) => state.auth);
  const [addOrder, { isLoading, error }] = useAddOrderMutation();

  const createOrder = async () => {
    try {
      const order = await addOrder({
        orderItems,
        shippingAddress,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      }).unwrap();

      dispatch(emptyCart());
      navigate(`/order/${order._id}`);

      toast.success("Order Created");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
      console.log(error);
    }
  };
  return (
    <>
      <Container className="text-secondary p-5">
        <Row>
          <Col>
            <h2>Shipping</h2>
            <p>
              <span className="fw-bold">Address : </span>
              {shippingAddress.address}, {shippingAddress.city},
              {shippingAddress.postalCode}
            </p>
            <p>
              <span className="fw-bold">Name : </span>
              {user.name}
            </p>
            <p>
              <span className="fw-bold">Email : </span>
              {user.email}
            </p>
            <hr className="mb-5" />
            <h2>Payment Method</h2>
            <p>
              <span className="fw-bold">Method : </span>
              Paypal
            </p>
            <hr className="mb-5" />
            <h2>Order Items</h2>
            <Row>
              <Col>
                {cartItems.map((cartItem) => (
                  <Card key={cartItem._id} className="mb-3 text-secondary">
                    <Card.Body>
                      <Row>
                        <Col md={1}>
                          <img
                            src={cartItem.image}
                            alt={cartItem.name}
                            style={{ width: "50px" }}
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/grocery/${cartItem._id}`}
                            className="link-secondary"
                          >
                            <p className="mx-5 text-secondary ">
                              {cartItem.name}
                            </p>
                          </Link>
                        </Col>
                        <Col md={4}>
                          <p>
                            {cartItem.quantity} x ${cartItem.price} = $
                            {cartItem.quantity * cartItem.price}
                          </p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          </Col>
          <Col>
            <Card className="shadow">
              <Card.Body className="text-secondary ">
                <Card.Title className=" fw-bold">
                  <h2>Order Summary</h2>
                </Card.Title>

                <hr />
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
                <hr />
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
                <hr />
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
                <hr />
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
                <hr />

                <Button variant="dark" className="w-100" onClick={createOrder}>
                  Place Order
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PlaceorderPage;
