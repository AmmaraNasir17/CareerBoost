export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

export const isNotEmpty = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateLoginForm = ({ email, password }) => {
  const errors = {};
  if (!isValidEmail(email)) errors.email = "Enter a valid email address";
  if (!isValidPassword(password)) errors.password = "Password must be at least 6 characters";
  return errors;
};

export const validateRegisterForm = ({ name, email, password, role }) => {
  const errors = {};
  if (!isNotEmpty(name)) errors.name = "Name is required";
  if (!isValidEmail(email)) errors.email = "Enter a valid email address";
  if (!isValidPassword(password)) errors.password = "Password must be at least 6 characters";
  if (!["applier", "recruiter"].includes(role)) errors.role = "Select a valid role";
  return errors;
};