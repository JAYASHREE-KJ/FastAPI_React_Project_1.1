import React from "react";
import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import API from "../api/authApi";

export default function Login() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const loginMutation = useMutation({

    mutationFn: async () => {

      const formData = new FormData();

      formData.append(
        "username",
        username
      );

      formData.append(
        "password",
        password
      );

      const response =
        await API.post(
          "/login",
          formData
        );

      return response.data;
    },

    onSuccess: (data) => {

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      localStorage.setItem(
        "refresh_token",
        data.refresh_token
      );

      alert("Login Success");
    },
  });

  return (

    <div>

      <h1>Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <button
        onClick={() =>
          loginMutation.mutate()
        }
      >
        Login
      </button>

    </div>
  );
}