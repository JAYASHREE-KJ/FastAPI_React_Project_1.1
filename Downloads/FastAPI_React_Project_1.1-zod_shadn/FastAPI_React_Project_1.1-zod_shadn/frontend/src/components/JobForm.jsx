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
    <Card className="w-full max-w-3xl mx-auto mt-4 border border-slate-200 bg-white shadow-sm">
      <CardHeader className="space-y-2 p-6">
        <CardTitle className="text-2xl font-semibold text-slate-900">Add Job</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-6 pt-0">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Company"
              {...form.register("company")}
              className="h-11 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-100"
            />
            <p className="text-sm font-medium text-rose-600">
              {form.formState.errors.company?.message}
            </p>
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Role"
              {...form.register("role")}
              className="h-11 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-100"
            />
            <p className="text-sm font-medium text-rose-600">
              {form.formState.errors.role?.message}
            </p>
          </div>

          <div className="space-y-2">
            <Select
              defaultValue="Applied"
              onValueChange={(value) => form.setValue("status", value)}
            >
              <SelectTrigger className="h-11 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:border-violet-500 focus:ring-violet-100">
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

          <div className="space-y-2">
            <Input
              type="date"
              {...form.register("applied_date")}
              className="h-11 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-100"
            />
            <p className="text-sm font-medium text-rose-600">
              {form.formState.errors.applied_date?.message}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-violet-600 text-white hover:bg-violet-700 font-semibold"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Adding..." : "Add Job"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}