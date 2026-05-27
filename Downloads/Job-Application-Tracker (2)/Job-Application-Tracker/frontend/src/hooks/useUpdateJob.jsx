import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateJob } from "../api/jobApi";

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJob,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
};