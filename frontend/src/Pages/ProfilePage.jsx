import React, { useState } from "react";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../Redux/Slices/ordersApiSlice";
import { useUpdateUserMutation } from "../Redux/Slices/usersApiSlice";
import { login } from "../Redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  console.log(orders);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const updatedUser = await updateUser({ name, email, password }).unwrap();
    dispatch(login(updatedUser));
    toast.success("User Updated");
  };

  return (
    <>
      <Row className="text-secondary">
        <Col className="userProfile p-5" md={4}>
          <h2>User Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="my-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Update
            </Button>
          </Form>
        </Col>
        <Col className="myOrders p-5" md={8}>
          <h2>My Orders</h2>

          <hr />
          {isLoading ? (
            <Loader />
          ) : error ? (
            <h3>{error}</h3>
          ) : (
            <>
              <Table striped hover responsive className="table-sm ">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order?._id}>
                      <td>{order?._id}</td>
                      <td>{order?.createdAt?.substring(0, 10)}</td>
                      <td>$ {order?.totalPrice}</td>
                      <td>
                        {order?.isPaid ? (
                          order?.paidAt?.substring(0, 10)
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>
                      <td>
                        {order?.isDelivered ? (
                          order?.deliveredAt?.substring(0, 10)
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className="btn-sm" variant="light">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};
export default ProfilePage;
