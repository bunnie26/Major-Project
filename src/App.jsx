import React from "react";
import "./assets/App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import FullCart from "./pages/FullCart";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { loadCartItem } from "./store/slices/cartSlice";
import { useEffect } from "react";
import Cart from "./components/Cart";
function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.email);
  useEffect(() => {
    dispatch(loadCartItem(currentUser));
  }, []);

  return (
    <div className="App">
      <Cart />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/orders">
            <Orders />
          </ProtectedRoute>
          <ProtectedRoute exact path="/product/:id">
            <ProductDetails />
          </ProtectedRoute>
          <ProtectedRoute exact path="/cart">
            <FullCart />
          </ProtectedRoute>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
