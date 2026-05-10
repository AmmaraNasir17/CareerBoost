import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { getResume } from "../services/resumeService";

export default function useResume() {
  const { token } = useAuth();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getResume(token)
      .then((data) => setResume(data.resume || null))
      .catch((err) => { if (!err.message.includes("No resume")) setError(err.message); })
      .finally(() => setLoading(false));
  }, []);

  return { resume, setResume, loading, error };
}