const calculateMatchScore = (resumeSkills, jobSkills) => {
  if (!jobSkills || jobSkills.length === 0) return 100;
  if (!resumeSkills || resumeSkills.length === 0) return 0;

  const normalizedResume = resumeSkills.map((s) => s.toLowerCase().trim());
  const normalizedJob = jobSkills.map((s) => s.toLowerCase().trim());

  const matched = normalizedJob.filter((skill) =>
    normalizedResume.some(
      (rs) => rs.includes(skill) || skill.includes(rs)
    )
  );

  const matchScore = Math.round((matched.length / normalizedJob.length) * 100);
  const missingSkills = normalizedJob.filter(
    (skill) => !normalizedResume.some((rs) => rs.includes(skill) || skill.includes(rs))
  );

  return { matchScore, matched, missingSkills };
};

const calculateATSScore = (resumeText) => {
  let score = 0;
  const feedback = [];

  const atsSections = [
    { keyword: "experience", label: "Work experience section" },
    { keyword: "education", label: "Education section" },
    { keyword: "skills", label: "Skills section" },
    { keyword: "summary", label: "Summary or objective" },
    { keyword: "project", label: "Projects section" },
  ];

  atsSections.forEach(({ keyword, label }) => {
    if (resumeText.toLowerCase().includes(keyword)) {
      score += 15;
    } else {
      feedback.push(`Missing: ${label}`);
    }
  });

  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(resumeText);
  const hasPhone = /(\+?\d[\d\s\-().]{7,}\d)/.test(resumeText);

  if (hasEmail) { score += 10; } else { feedback.push("Missing: Email address"); }
  if (hasPhone) { score += 10; } else { feedback.push("Missing: Phone number"); }

  const atsScore = Math.min(score, 100);
  return { atsScore, feedback };
};

module.exports = {
  calculateMatchScore,
  calculateATSScore,
};