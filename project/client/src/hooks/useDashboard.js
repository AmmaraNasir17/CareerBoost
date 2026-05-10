import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { getApplierDashboard, getRecruiterDashboard } from "../services/dashboardService";

export default function useDashboard() {
  const { token, role } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = role === "applier" ? getApplierDashboard : getRecruiterDashboard;
    fetch(token)
      .then((res) => setData(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}