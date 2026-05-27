import React from "react";

import { useState } from "react";

import { useJobs } from "../hooks/useJobs";

import SearchBar from "../components/SearchBar";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";

export default function Home() {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    error,
  } = useJobs();

  const jobs = data || [];

  const filteredJobs = jobs.filter((job) =>
    job.company
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error fetching jobs</h2>;
  }

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <JobForm />

      <JobList jobs={filteredJobs} />
    </div>
  );
}