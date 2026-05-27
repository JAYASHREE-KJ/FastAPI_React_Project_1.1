import React from "react";

import { Routes, Route, Link, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-lg font-semibold text-slate-900">
            JobTracker
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { href: "/", label: "Home" },
              { href: "/login", label: "Login" },
              { href: "/register", label: "Register" },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive(item.href)
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}