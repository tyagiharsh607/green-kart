import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Loader from "../Components/Loader";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../Redux/Slices/usersApiSlice";
import { login } from "../Redux/Slices/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ email, password }).unwrap();
      if (user) {
        dispatch(login(user));
        toast.success("Login Successful");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };
  return (
    <>
      <Container className="p-5">
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button disabled={isLoading} type="submit" variant="primary">
            Sign In
          </Button>

          {isLoading && <Loader />}
        </Form>

        <Row className="py-3">
          <Col>
            New Customer? <Link to={"/register"}>Register</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
