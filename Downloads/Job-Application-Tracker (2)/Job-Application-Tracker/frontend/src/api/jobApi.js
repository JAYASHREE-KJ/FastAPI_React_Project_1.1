import axios from "axios";

const API = "http://127.0.0.1:8000/jobs";

export const getJobs = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const createJob = async (job) => {
  const response = await axios.post(`${API}/`, job);
  return response.data;
};

export const updateJob = async ({ id, data }) => {
  const response = await axios.put(`${API}/${id}`, data);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};