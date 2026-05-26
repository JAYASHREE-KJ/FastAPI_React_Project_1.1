import React, { useState } from "react";

import { useJobSearch } from "../hooks/useJobSearch";


import SearchBar from "../components/SearchBar";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";

export default function Home() {
  
const {
    search,
    setSearch,
    page,
    setPage,
    jobs,
    totalPages,
    isLoading,
    error,
  } = useJobSearch();


  return (

    <div className="container">

      <h1>Job Application Tracker</h1>

      <SearchBar

        search={search}

        setSearch={(value) => {

          setSearch(value);

          setPage(1);

        }}
      />

      <JobForm />

      <JobList jobs={jobs} isLoading={isLoading} error={error} />

      <div className="pagination">

        <button

          disabled={page === 1}

          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>

          Page {page} of {totalPages}

        </span>

        <button

          disabled={page >= totalPages}

          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}