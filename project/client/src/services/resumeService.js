import { apiRequest } from "./api";

export const getResume = (token) => apiRequest("/resume", "GET", null, token);
export const saveResume = (token, data) => apiRequest("/resume", "POST", data, token);
export const uploadResume = (token, formData) => apiRequest("/resume/upload", "POST", formData, token, true);
export const analyzeResume = (token, jobSkills = []) => apiRequest("/resume/analyze", "POST", { job_skills: jobSkills }, token);
export const getAnalysisResult = (token) => apiRequest("/resume/analysis", "GET", null, token);
export const exportResumePDF = (token) => apiRequest("/resume/export", "GET", null, token);