import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import API from "../api/authApi";
import { RegisterSchema } from "../schemas/jobSchema";
type RegisterFormData = z.infer<typeof RegisterSchema>;

export default function Register() {

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerMutation = useMutation({

    mutationFn: async (data: RegisterFormData) => {

      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);

      const response = await API.post("/register", formData);
      return response.data;
    },

    onSuccess: () => {
      alert("Registered Successfully");
      form.reset(); 
    },

    onError: () => {
      alert("Registration failed");
    }
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (

    <div>

      <h1>Register</h1>

      <form onSubmit={form.handleSubmit(onSubmit)}>

        <div>
          <input
            placeholder="Username"
            {...form.register("username")}
          />
          <p>{form.formState.errors.username?.message}</p>
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...form.register("password")}
          />
          <p>{form.formState.errors.password?.message}</p>
        </div>

        <button type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Registering..." : "Register"}
        </button>

      </form>

    </div>
  );
}