import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { getAllQuizzes, getMyAttempts } from "../services/quizService";

export default function useQuiz(filters = {}) {
  const { token } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getAllQuizzes(token, filters), getMyAttempts(token)])
      .then(([qData, aData]) => {
        setQuizzes(qData.quizzes || []);
        setAttempts(aData.attempts || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  const getBestScore = (quizId) => {
    const quizAttempts = attempts.filter((a) => a.quiz_id === quizId);
    if (!quizAttempts.length) return undefined;
    return Math.max(...quizAttempts.map((a) => a.score));
  };

  return { quizzes, attempts, loading, error, getBestScore };
}