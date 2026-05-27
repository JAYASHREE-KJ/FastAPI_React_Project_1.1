import API from "./authApi";
import { z } from "zod";
import { JobSchema } from "../schemas/jobSchema";

/**
 * ✅ Reusable validation function
 */
const validate = (schema, data) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.error("Zod Validation Error:", result.error);
    throw new Error("Invalid API response");
  }

  return result.data;
};

const BASE_URL = "/jobs";

/**
 * ✅ GET JOBS (ARRAY RESPONSE)
 */
export const getJobs = async (page = 1) => {
  const limit = 5;

  const response = await API.get(
    `${BASE_URL}/?page=${page}&limit=${limit}`
  );

  return validate(z.array(JobSchema), response.data);
};

/**
 * ✅ CREATE JOB (SINGLE OBJECT RESPONSE)
 */
export const createJob = async (job) => {
  const response = await API.post(
    `${BASE_URL}/`,
    job
  );

  return validate(JobSchema, response.data);
};

/**
 * ✅ UPDATE JOB
 */
export const updateJob = async ({ id, data }) => {
  const response = await API.put(
    `${BASE_URL}/${id}`,
    data
  );

  return validate(JobSchema, response.data);
};

/**
 * ✅ DELETE JOB (OPTIONAL VALIDATION)
 */
const DeleteSchema = z.object({
  message: z.string(),
});

export const deleteJob = async (id) => {
  const response = await API.delete(
    `${BASE_URL}/${id}`
  );

  return validate(DeleteSchema, response.data);
};