import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import API from "../api/authApi";
import { LoginSchema } from "../schemas/jobSchema";

type LoginFormData = z.infer<typeof LoginSchema>;

export default function Login() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);

      const response = await API.post("/login", formData);
      return response.data;
    },

    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      alert("Login Success");
    },

    onError: () => {
      alert("Login Failed");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

 return (
  <div>
    <h1>Login</h1>

    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <input placeholder="Username" {...form.register("username")} />
        <p>{form.formState.errors?.username?.message}</p>
      </div>

      <div>
        <input type="password" placeholder="Password" {...form.register("password")} />
        <p>{form.formState.errors?.password?.message}</p>
      </div>

      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  </div>
);
}
