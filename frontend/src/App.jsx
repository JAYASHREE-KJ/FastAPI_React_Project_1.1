import React from "react";

import {
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {

  return (

    <div>

      <nav
        style={{
          padding: "20px",
          display: "flex",
          gap: "15px",
          fontSize: "18px"
        }}
      >

        <Link to="/">
          Home
        </Link>

        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>

      </nav>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

    </div>
  );
}