import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Category from "./components/category/category";
import Users from "./components/users/users";
import Restaurants from "./components/restaurant/restaurants";
import Products from "./components/products/products";

function App() {
  let navigate = useNavigate();

  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category" element={<Category />} />
        <Route path="/users" element={<Users />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
