import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useGetGroceryByIdQuery,
  useAddReviewMutation,
} from "../Redux/Slices/groceriesApiSlice";
import Loader from "../Components/Loader";
import Rating from "../Components/Rating";
import { addToCart } from "../Redux/Slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const GroceryPage = () => {
  const { id } = useParams();
  const {
    data: grocery,
    error,
    isLoading,
    refetch,
  } = useGetGroceryByIdQuery(id);
  const [addReview, { isLoading: isAddingReview }] = useAddReviewMutation();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...grocery, quantity }));
    navigate("/cart");
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      rating,
      comment: review,
    };
    console.log(reviewData);
    const addedReview = await addReview({ id, reviewData }).unwrap();
    if (addedReview) {
      refetch();
      setRating(1);
      setReview("");
      toast.success("Review added successfully");
    } else {
      toast.error("Review not added");
    }

    console.log(rating, review);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Container>
          <Row>
            <Col>
              <Card className="mt-2">
                <Card.Img
                  variant="top"
                  src={grocery.image}
                  style={{ width: "300px" }}
                />
                <Card.Body className="text-secondary">
                  <Card.Title>{grocery.name.toUpperCase()}</Card.Title>
                  <Card.Text>Price : ${grocery.price}/kg</Card.Text>
                  <Card.Text>Description : {grocery.description}</Card.Text>
                  <Card.Text>Reviews: {grocery.rating}/5</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <Card className="p-5">
                <Form onSubmit={submitHandler}>
                  <div>Price : ${grocery.price}/Kg</div>
                  <div>
                    Status :{" "}
                    {grocery.countInStockInKgs ? (
                      <span className="text-success">In Stock </span>
                    ) : (
                      <span className="text-danger">Out Of Stock</span>
                    )}
                  </div>
                  <Form.Group controlId="quantity">
                    <Form.Label>Quantity In Kgs :</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(Number(e.target.value));
                      }}
                    />
                  </Form.Group>
                  {}
                  <Button
                    variant="dark"
                    type="submit"
                    className="mt-3"
                    disabled={!grocery.countInStockInKgs}
                  >
                    Add to Cart
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Alert variant="danger" className="mt-4">
                Reviews
              </Alert>
              {grocery.reviews.length === 0 && (
                <Alert variant="info">No Reviews</Alert>
              )}
              {grocery.reviews.map((review) => (
                <Alert variant="light" key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} color="#f8e825" />
                  <p>{review.createdAt.substring(0, 10)}</p>

                  <p>{review.comment}</p>
                </Alert>
              ))}
              <Form>
                <Alert variant="success" className="mt-4">
                  Write a Review
                </Alert>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5 </option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="review">
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </Form.Group>
                <Button
                  className="mt-3"
                  variant="success"
                  type="submit"
                  onClick={handleReviewSubmit}
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default GroceryPage;
