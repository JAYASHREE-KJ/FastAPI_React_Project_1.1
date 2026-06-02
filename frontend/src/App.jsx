import React from "react";
import { useMsal } from "@azure/msal-react";

import { Routes, Route, Link, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChartsPage from "./components/ChartPage";

export default function App() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const { accounts, instance } = useMsal();

const handleLogout = async () => {
  await instance.logoutRedirect();
};


 return (
  <div className="min-h-screen bg-slate-50 text-slate-900">

    <nav className="sticky top-0 z-20 border-b border-gray-200 bg-white">

      <div className="flex w-full items-center justify-between px-4 py-3">

        <div className="flex items-center gap-6 text-sm">
          <Link to="/" className="text-lg font-semibold text-gray-800">
            JobTracker
          </Link>

          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/charts">Charts</Link>
        </div>

        <div className="flex items-center gap-4">

          <span className="text-sm text-gray-600">
            {accounts[0]?.username}
          </span>

          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
            {accounts[0]?.username?.charAt(0).toUpperCase()}
          </div>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Sign out
          </button>

        </div>

      </div>

    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/charts" element={<ChartsPage />} />
    </Routes>

  </div>
);
}