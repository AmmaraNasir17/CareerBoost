const calculateQuizScore = (questions, userAnswers) => {
  let correct = 0;
  const breakdown = [];

  questions.forEach((question) => {
    const userAnswer = userAnswers[question.id];
    const isCorrect = userAnswer === question.correct_answer;

    if (isCorrect) correct++;

    breakdown.push({
      question_id: question.id,
      question_text: question.question_text,
      user_answer: userAnswer || null,
      correct_answer: question.correct_answer,
      is_correct: isCorrect,
    });
  });

  const scorePercentage = Math.round((correct / questions.length) * 100);

  return { correct, total: questions.length, scorePercentage, breakdown };
};

const getPerformanceLabel = (score) => {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "average";
  return "needs_improvement";
};

module.exports = { calculateQuizScore, getPerformanceLabel };