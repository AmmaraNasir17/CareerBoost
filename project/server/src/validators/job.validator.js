const { body, query } = require("express-validator");

const postJobValidator = [
  body("title")
    .trim()
    .notEmpty().withMessage("Job title is required")
    .isLength({ max: 100 }).withMessage("Title must be under 100 characters"),

  body("description")
    .trim()
    .notEmpty().withMessage("Job description is required")
    .isLength({ min: 20 }).withMessage("Description must be at least 20 characters"),

  body("location")
    .trim()
    .notEmpty().withMessage("Location is required"),

  body("job_type")
    .notEmpty().withMessage("Job type is required")
    .isIn(["full_time", "part_time", "contract", "freelance", "internship"])
    .withMessage("Invalid job type"),

  body("experience_level")
    .notEmpty().withMessage("Experience level is required")
    .isIn(["entry", "mid", "senior", "lead"])
    .withMessage("Invalid experience level"),

  body("salary")
    .optional()
    .isNumeric().withMessage("Salary must be a number"),

  body("required_skills")
    .optional()
    .isArray().withMessage("Required skills must be an array"),
];

const updateJobValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage("Title must be under 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 20 }).withMessage("Description must be at least 20 characters"),

  body("job_type")
    .optional()
    .isIn(["full_time", "part_time", "contract", "freelance", "internship"])
    .withMessage("Invalid job type"),

  body("experience_level")
    .optional()
    .isIn(["entry", "mid", "senior", "lead"])
    .withMessage("Invalid experience level"),

  body("salary")
    .optional()
    .isNumeric().withMessage("Salary must be a number"),
];

const jobFilterValidator = [
  query("salary_min")
    .optional()
    .isNumeric().withMessage("salary_min must be a number"),

  query("salary_max")
    .optional()
    .isNumeric().withMessage("salary_max must be a number"),

  query("job_type")
    .optional()
    .isIn(["full_time", "part_time", "contract", "freelance", "internship"])
    .withMessage("Invalid job type filter"),

  query("experience_level")
    .optional()
    .isIn(["entry", "mid", "senior", "lead"])
    .withMessage("Invalid experience level filter"),
];

module.exports = {
  postJobValidator,
  updateJobValidator,
  jobFilterValidator,
};