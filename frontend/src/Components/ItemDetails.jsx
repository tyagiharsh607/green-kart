import { useState } from "react";
import { Col, Row, Image, Form, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/Slices/cartSlice";

const ItemDetails = ({ cartItem }) => {
  const { name, image, price, quantity } = cartItem;
  const [qty, setQty] = useState(quantity);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeFromCart(cartItem._id));
  };

  const changeQtyHandler = (e) => {
    setQty(Number(e.target.value));
    dispatch(addToCart({ ...cartItem, quantity: Number(e.target.value) }));
  };

  return (
    <>
      <Row className="text-secondary">
        <Col>
          <Image src={image} style={{ width: "5rem" }} className="rounded" />
        </Col>
        <Col className="mt-3">{name.toUpperCase()}</Col>
        <Col className="mt-3">${price}</Col>

        <Col className="mt-3">
          <Form.Control
            value={qty}
            type="number"
            min="1"
            onChange={changeQtyHandler}
          />
        </Col>
        <Col className="mt-3">
          <Button variant="light" onClick={handleDelete}>
            <FaTrash color="black" />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ItemDetails;
