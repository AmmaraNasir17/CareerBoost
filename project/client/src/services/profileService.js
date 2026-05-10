import { apiRequest } from "./api";

export const getProfile = (token) => apiRequest("/profile", "GET", null, token);
export const updateProfile = (token, data) => apiRequest("/profile", "PUT", data, token);
export const changePassword = (token, data) => apiRequest("/auth/change-password", "POST", data, token);