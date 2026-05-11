import { apiRequest } from "./api";

export const getAllQuizzes = (token, filters = {}) => {
  const params = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
  ).toString();
  return apiRequest(`/quizzes${params ? `?${params}` : ""}`, "GET", null, token);
};

export const getQuizById = (token, id) => apiRequest(`/quizzes/${id}`, "GET", null, token);
export const createQuiz = (token, data) => apiRequest("/quizzes", "POST", data, token);
export const addQuestion = (token, quizId, data) => apiRequest(`/quizzes/${quizId}/questions`, "POST", data, token);
export const submitQuiz = (token, id, answers) => apiRequest(`/quizzes/${id}/submit`, "POST", { answers }, token);
export const getMyAttempts = (token) => apiRequest("/quizzes/attempts/my", "GET", null, token);
export const getAttemptsByQuiz = (token, id) => apiRequest(`/quizzes/${id}/attempts`, "GET", null, token);