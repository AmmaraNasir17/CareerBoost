import { apiRequest } from "./api";

export const getAllJobs = (token, filters = {}) => {
  const params = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
  ).toString();
  return apiRequest(`/jobs${params ? `?${params}` : ""}`, "GET", null, token);
};

export const getJobById = (token, id) => apiRequest(`/jobs/${id}`, "GET", null, token);
export const getMyJobs = (token) => apiRequest("/jobs/my-jobs", "GET", null, token);
export const postJob = (token, data) => apiRequest("/jobs", "POST", data, token);
export const editJob = (token, id, data) => apiRequest(`/jobs/${id}`, "PUT", data, token);
export const deleteJob = (token, id) => apiRequest(`/jobs/${id}`, "DELETE", null, token);
export const getSavedJobs = (token) => apiRequest("/saved-jobs", "GET", null, token);
export const toggleSaveJob = (token, id) => apiRequest(`/saved-jobs/${id}/toggle`, "POST", null, token);