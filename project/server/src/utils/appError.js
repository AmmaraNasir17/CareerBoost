class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const createHttpError = (message, status) => {
  return new AppError(message, status);
};

module.exports = { AppError, createHttpError };