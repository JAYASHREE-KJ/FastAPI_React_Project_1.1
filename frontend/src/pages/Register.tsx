import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import API from "../api/authApi";
import { RegisterSchema } from "../schemas/jobSchema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

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
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 text-slate-900">
      <div className="mx-auto max-w-md">
        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardHeader className="space-y-3 p-8">
            <CardTitle className="text-3xl font-bold text-slate-900">
              Create Account
            </CardTitle>
            <CardDescription className="text-slate-600">
              Join us today to get started.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 pt-0">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Username</label>
                <Input
                  placeholder="Choose a username"
                  {...form.register("username")}
                  className="h-11 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-100"
                />
                {form.formState.errors.username && (
                  <p className="text-sm font-medium text-rose-600">
                    {form.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Input
                  type="password"
                  placeholder="Create a password"
                  {...form.register("password")}
                  className="h-11 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-100"
                />
                {form.formState.errors.password && (
                  <p className="text-sm font-medium text-rose-600">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full h-11 bg-violet-600 text-white hover:bg-violet-700 font-semibold"
              >
                {registerMutation.isPending ? "Registering..." : "Register"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}