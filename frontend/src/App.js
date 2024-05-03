import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import GroceryPage from "./Pages/GroceryPage";
import Cart from "./Pages/Cart";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ShippingPage from "./Pages/ShippingPage";
import PlaceorderPage from "./Pages/PlaceorderPage";
import ProfilePage from "./Pages/ProfilePage";
import OrderPage from "./Pages/OrderPage";
import OrderListPage from "./Pages/Admin/OrderListPage";
import UserListPage from "./Pages/Admin/UserListPage";
import GroceryListPage from "./Pages/Admin/GroceryListPage";
import GroceryEditPage from "./Pages/Admin/GroceryEditPage";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminRoute from "./Components/AdminRoute";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/grocery/:id" element={<GroceryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          //Private Routes
          <Route path="" element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/placeorder" element={<PlaceorderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
          </Route>
          //Admin Routes
          <Route path="" element={<AdminRoute />}>
            <Route path="/admin/orderlist" element={<OrderListPage />} />
            <Route path="/admin/userlist" element={<UserListPage />} />
            <Route path="/admin/grocerylist" element={<GroceryListPage />} />
            <Route
              path="/admin/grocery/:id/edit"
              element={<GroceryEditPage />}
            />
          </Route>
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
