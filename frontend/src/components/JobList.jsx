import React from "react";

import JobCard from "./JobCard";

export default function JobList({ jobs, isLoading, error }) {
if (isLoading) {
  return <h2>Loading...</h2>;
}

if (error) {
  return <h2>Error fetching jobs</h2>;
}
return (
    <div>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
        />
      ))}
    </div>
  );
}