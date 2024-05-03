import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const GroceryCard = ({ grocery }) => {
  const { _id, name, description, price, image } = grocery;
  return (
    <>
      <Card style={{ width: "18rem" }} className="m-3 text-secondary">
        <Card.Img variant="top" src={image} style={{ height: "200px" }} />
        <Card.Body>
          <Card.Title>{name.toUpperCase()}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>${price}/Kg</Card.Text>
          <Link to={`/grocery/${_id}`}>
            <Button variant="secondary">View</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default GroceryCard;
