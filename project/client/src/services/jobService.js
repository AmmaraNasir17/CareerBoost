import { apiRequest } from "./api";

// create job (recruiter)
export const createJob = (data, token) => {
  return apiRequest("/jobs", "POST", data, token);
};

// get all jobs (public)
export const getAllJobs = () => {
  return apiRequest("/jobs", "GET");
};

// get recruiter jobs
export const getMyJobs = (token) => {
  return apiRequest("/jobs/my-jobs", "GET", null, token);
};

// delete job
export const deleteJob = (id, token) => {
  return apiRequest(`/jobs/${id}`, "DELETE", null, token);
};

// get single job
export const getJobById = (id) => {
  return apiRequest(`/jobs/${id}`, "GET");
};