
// FIX: Import the default express module and use namespaced types to avoid conflicts.
import express from 'express';

// FIX: Use namespaced express types to ensure correct type resolution.
const notFound = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// FIX: Use namespaced express types for the error handler.
const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose Bad ObjectId
  if (err.name === 'CastError' && (err as any).kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };