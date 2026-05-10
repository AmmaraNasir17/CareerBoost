import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { getSkillProgress, getWeakAreas, getStreak } from "../services/skillService";

export default function useSkills() {
  const { token } = useAuth();
  const [progress, setProgress] = useState([]);
  const [weakAreas, setWeakAreas] = useState([]);
  const [streak, setStreak] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getSkillProgress(token), getWeakAreas(token), getStreak(token)])
      .then(([pData, wData, sData]) => {
        setProgress(pData.progress || []);
        setWeakAreas(wData.weakAreas || []);
        setStreak(sData.streak || null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { progress, weakAreas, streak, loading, error };
}