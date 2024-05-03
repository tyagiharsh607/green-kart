import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown, Badge, Form, Button } from "react-bootstrap";

import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../Redux/Slices/usersApiSlice.js";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Slices/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser, { error, isLoading }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logged out succesfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("srea", keyword);
    if (keyword) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Green Kart</Navbar.Brand>
          </LinkContainer>
        </Container>
        <Form className="d-flex  gap-3" onSubmit={handleSearch}>
          <Form.Control
            style={{ width: "200px" }}
            placeholder="Search Groceries"
            onChange={(e) => {
              console.log(e.target.value);
              setKeyword(e.target.value);
            }}
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
        {user ? (
          <>
            <LinkContainer to="/cart" className="text-white mx-5">
              <Nav.Link>
                <FaShoppingCart />
                {cartItems.length > 0 && (
                  <Badge bg="danger" className="mx-1">
                    {cartItems.length}
                  </Badge>
                )}
                Cart
              </Nav.Link>
            </LinkContainer>
            <NavDropdown
              title={user?.name}
              id="username"
              className="text-white mx-2"
            >
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          <LinkContainer to="/login" className="text-white mx-5">
            <Nav.Link>
              <FaUser /> Sign In
            </Nav.Link>
          </LinkContainer>
        )}
        {user && user.isAdmin && (
          <NavDropdown title="Admin" id="adminmenu" className="text-white mx-5">
            <LinkContainer to="/admin/grocerylist">
              <NavDropdown.Item>Groceries</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/orderlist">
              <NavDropdown.Item>Orders</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/userlist">
              <NavDropdown.Item>Users</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        )}
      </Navbar>
    </>
  );
};

export default Header;
