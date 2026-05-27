import React from "react";

import { useState } from "react";

import { useCreateJob } from "../hooks/useCreateJob";

export default function JobForm() {
  const createMutation = useCreateJob();

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    applied_date: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createMutation.mutate(form);

    setForm({
      company: "",
      role: "",
      status: "Applied",
      applied_date: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
        required
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>

      <input
        type="date"
        name="applied_date"
        value={form.applied_date}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Add Job
      </button>
    </form>
  );
}