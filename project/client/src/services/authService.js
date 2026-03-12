import { apiRequest } from "./api";

export function registerUser(userData) {
  return apiRequest("/auth/register", "POST", userData);
}

export function loginUser(userData) {
  return apiRequest("/auth/login", "POST", userData);
}