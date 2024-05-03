import React from "react";
import Carousel from "react-bootstrap/Carousel";
import LinkContainer from "react-router-bootstrap/LinkContainer";

const GroceryCarousel = ({ groceries }) => {
  console.log(groceries);
  return (
    <>
      <Carousel data-bs-theme="dark">
        {groceries?.map((grocery) => (
          <Carousel.Item style={{ height: "400px" }}>
            <LinkContainer to={`/grocery/${grocery._id}`}>
              <img
                className="d-block w-100"
                src={grocery.image}
                alt={grocery.name}
                fluid
                style={{ width: "100%" }}
              />
            </LinkContainer>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default GroceryCarousel;
