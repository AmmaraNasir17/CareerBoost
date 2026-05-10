import { apiRequest } from "./api";

export const getApplierDashboard = (token) => apiRequest("/dashboard/applier", "GET", null, token);
export const getRecruiterDashboard = (token) => apiRequest("/dashboard/recruiter", "GET", null, token);