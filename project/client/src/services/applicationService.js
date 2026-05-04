import { apiRequest } from "./api";

// get my applications (applier)
export const getMyApplications = (token) => {
  return apiRequest("/applications/my-applications", "GET", null, token);
};