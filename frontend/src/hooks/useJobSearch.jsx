import { useState } from "react";
import { useJobs } from "./useJobs";

export function useJobSearch() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useJobs({
    search,
    page,
  });

  const jobs = data?.jobs || [];
  const totalPages = data?.totalPages || 1;

  return {
    search,
    setSearch,
    page,
    setPage,
    jobs,
    totalPages,
    isLoading,
    error,
  };
}