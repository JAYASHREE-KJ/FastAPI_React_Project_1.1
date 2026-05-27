import React from "react";

import { useJobSearch } from "../hooks/useJobSearch";
import SearchBar from "../components/SearchBar";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import { Button } from "../components/ui/button";

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
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-sm">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">
              Job Tracker
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Keep your applications organized.
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-base leading-7 text-slate-600">
              Add new positions, track status, and search through your job pipeline with a calm, refined interface.
            </p>
          </div>

          <div className="space-y-8">
            <SearchBar
              search={search}
              setSearch={(value) => {
                setSearch(value);
                setPage(1);
              }}
            />

            <JobForm />

            <JobList jobs={jobs} isLoading={isLoading} error={error} />

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                Page {page} of {totalPages}
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  variant={page === 1 ? "outline" : "secondary"}
                  className="h-10 px-5 font-semibold"
                >
                  Previous
                </Button>

                <Button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  variant={page >= totalPages ? "outline" : "secondary"}
                  className="h-10 px-5 font-semibold"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}