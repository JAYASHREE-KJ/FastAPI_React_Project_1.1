import React from "react";
import { useCreateJob } from "../hooks/useCreateJob";
import { JobSchema } from "../schemas/jobSchema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

export default function JobForm() {
  const createMutation = useCreateJob();

  const form = useForm({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      company: "",
      role: "",
      status: "Applied",
      applied_date: "",
    },
  });

  const onSubmit = (data) => {
    createMutation.mutate(data);
    form.reset();
  };

  return (
    <Card
      className="w-full max-w-3xl mx-auto mt-4 rounded-2xl shadow-lg
    !bg-gradient-to-r from-[#764ba2] via-[#6a4fb3] to-[#5d4aa8] text-white"
    >
      <CardHeader>
        <CardTitle>Add Job</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

          {/* Company */}
          <div>
            <Input
              placeholder="Company"
              {...form.register("company")}
              className="bg-white/20 text-white placeholder:text-white/70 border border-white/30"
            />
            <p className="text-red-500 text-sm">
              {form.formState.errors.company?.message}
            </p>
          </div>

          {/* Role */}
          <div>
            <Input
              placeholder="Role"
              {...form.register("role")}
              className="bg-white/20 text-white placeholder:text-white/70 border border-white/30"
            />
            <p className="text-red-500 text-sm">
              {form.formState.errors.role?.message}
            </p>
          </div>

          {/* Status */}
          <div>
            <Select
              defaultValue="Applied"
              onValueChange={(value) =>
                form.setValue("status", value)
              }
            >
              <SelectTrigger className="bg-white/20 text-white border border-white/30">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Offer">Offer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Applied Date */}
          <div>
            <Input
              type="date"
              {...form.register("applied_date")}
            />
            <p className="text-red-500 text-sm">
              {form.formState.errors.applied_date?.message}
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Adding..." : "Add Job"}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}