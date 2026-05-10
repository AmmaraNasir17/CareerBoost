import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { getMyApplications } from "../services/applicationService";

export default function useApplications() {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyApplications(token)
      .then((data) => setApplications(data.applications || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { applications, setApplications, loading, error };
}