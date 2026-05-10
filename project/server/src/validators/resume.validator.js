const { body } = require("express-validator");

const saveResumeValidator = [
  body("personal_info")
    .optional()
    .isObject().withMessage("personal_info must be an object"),

  body("personal_info.name")
    .optional()
    .trim()
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),

  body("personal_info.email")
    .optional()
    .isEmail().withMessage("Must be a valid email address"),

  body("education")
    .optional()
    .isArray().withMessage("Education must be an array"),

  body("experience")
    .optional()
    .isArray().withMessage("Experience must be an array"),

  body("projects")
    .optional()
    .isArray().withMessage("Projects must be an array"),

  body("skills")
    .optional()
    .isArray().withMessage("Skills must be an array"),
];

const analyzeResumeValidator = [
  body("job_skills")
    .optional()
    .isArray().withMessage("job_skills must be an array of strings"),
];

module.exports = {
  saveResumeValidator,
  analyzeResumeValidator,
};