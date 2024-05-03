import React from "react";
import Loader from "../Components/Loader";
import GroceryCard from "../Components/GroceryCard";
import {
  useGetGroceriesQuery,
  useGetTopGroceriesQuery,
} from "../Redux/Slices/groceriesApiSlice";
import { Container, Row, Col } from "react-bootstrap";
import GroceryCarousel from "../Components/GroceryCarousel";
import { useParams } from "react-router-dom";

const Home = () => {
  const { keyword } = useParams();
  console.log("k", { keyword });
  const { data: groceries, error, isLoading } = useGetGroceriesQuery(keyword);
  const { data: topGroceries } = useGetTopGroceriesQuery();

  return (
    <>
      <GroceryCarousel groceries={topGroceries} />
      {isLoading && <Loader />}
      <Row>
        {groceries?.map((grocery) => (
          <Col key={grocery._id} md={4}>
            <GroceryCard grocery={grocery} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
