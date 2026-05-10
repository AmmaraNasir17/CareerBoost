import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { getAllJobs } from "../services/jobService";

export default function useJobs(filters = {}) {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllJobs(token, filters)
      .then((data) => setJobs(data.jobs || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  return { jobs, loading, error };
}