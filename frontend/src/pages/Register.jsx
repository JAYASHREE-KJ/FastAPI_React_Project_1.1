import React from "react";
import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import API from "../api/authApi";

export default function Register() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const registerMutation =
    useMutation({

      mutationFn: async () => {

        const formData =
          new FormData();

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
            "/register",
            formData
          );

        return response.data;
      },

      onSuccess: () => {

        alert(
          "Registered Successfully"
        );
      },
    });

  return (

    <div>

      <h1>Register</h1>

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
          registerMutation.mutate()
        }
      >
        Register
      </button>

    </div>
  );
}