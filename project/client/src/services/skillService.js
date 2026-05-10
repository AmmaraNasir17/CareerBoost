import { apiRequest } from "./api";

export const getSkillProgress = (token) => apiRequest("/skills/progress", "GET", null, token);
export const getWeakAreas = (token) => apiRequest("/skills/weak-areas", "GET", null, token);
export const getStreak = (token) => apiRequest("/skills/streak", "GET", null, token);