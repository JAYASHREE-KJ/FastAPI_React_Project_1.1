import React from "react";
import JobCard from "./JobCard";

import {
  Card,
  CardContent,
} from "../components/ui/card";

import { Skeleton } from "../components/ui/skeleton";

export default function JobList({ jobs, isLoading, error }) {
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <Card key={item}>
            <CardContent className="space-y-2 p-4">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto mt-4">
        <CardContent className="p-4 text-center text-red-500">
          Error fetching jobs 
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 mt-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
