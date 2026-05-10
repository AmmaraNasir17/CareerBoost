import { apiRequest } from "./api";

export const applyToJob = (token, jobId) => apiRequest(`/jobs/${jobId}/apply`, "POST", null, token);
export const getMyApplications = (token) => apiRequest("/applications/my", "GET", null, token);
export const getAllApplicants = (token) => apiRequest("/applications/all", "GET", null, token);
export const getApplicantsForJob = (token, jobId) => apiRequest(`/jobs/${jobId}/applicants`, "GET", null, token);
export const updateApplicationStatus = (token, id, status) => apiRequest(`/applications/${id}/status`, "PATCH", { status }, token);