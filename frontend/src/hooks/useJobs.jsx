import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useJobs = ({ search, page }) => {
  return useQuery({
    queryKey: ["jobs", search, page],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8000/jobs/", {
        params: {
          search: search,
          page: page,
          limit: 5,
        },
      });
      return res.data;
    },
  });
};