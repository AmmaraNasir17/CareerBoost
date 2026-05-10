export const JOB_TYPES = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
];

export const JOB_TYPE_LABELS = Object.fromEntries(JOB_TYPES.map((t) => [t.value, t.label]));

export const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
  { value: "lead", label: "Lead" },
];

export const EXPERIENCE_LABELS = Object.fromEntries(EXPERIENCE_LEVELS.map((l) => [l.value, l.label]));

export const APPLICATION_STATUS = {
  applied:      { label: "Applied",      variant: "blue"   },
  under_review: { label: "Under Review", variant: "yellow" },
  shortlisted:  { label: "Shortlisted",  variant: "green"  },
  rejected:     { label: "Rejected",     variant: "red"    },
};

export const DIFFICULTY_VARIANTS = {
  easy:   "green",
  medium: "yellow",
  hard:   "red",
};

export const PERFORMANCE_LABELS = {
  excellent:        { label: "Excellent",        variant: "green"  },
  good:             { label: "Good",             variant: "blue"   },
  average:          { label: "Average",          variant: "yellow" },
  needs_improvement:{ label: "Needs Improvement",variant: "red"    },
};