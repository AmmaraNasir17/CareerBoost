import { apiRequest } from "./api";

// get my applications (applier)
export const getMyApplications = (token) => {
  return apiRequest("/applications/my-applications", "GET", null, token);
};

// get applicants for a job (recruiter)
export const getApplicants = (token) => {
  return apiRequest("/applications/my-applicants", "GET", null, token);
};

// update application status (recruiter)
export const updateApplicationStatus = (applicationId, status, token) => {
  return apiRequest(`/applications/${applicationId}/status`, "PUT", { status }, token);
};