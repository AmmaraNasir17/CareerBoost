import { apiRequest } from "./api";

// get all jobs (public)
export const getAllJobs = () => {
  return apiRequest("/jobs", "GET");
};

// get single job (public)
export const getJobById = (id) => {
  return apiRequest(`/jobs/${id}`, "GET");
};

// create job (recruiter)
export const createJob = (data, token) => {
  return apiRequest("/jobs", "POST", data, token);
};

// get my posted jobs (recruiter)
export const getMyJobs = (token) => {
  return apiRequest("/jobs/my-jobs", "GET", null, token);
};

// delete job (recruiter)
export const deleteJob = (id, token) => {
  return apiRequest(`/jobs/${id}`, "DELETE", null, token);
};

// apply to job (applier)
export const applyToJob = (id, token) => {
  return apiRequest(`/jobs/${id}/apply`, "POST", null, token);
};
