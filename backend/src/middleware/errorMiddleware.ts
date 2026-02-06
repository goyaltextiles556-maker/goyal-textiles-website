
// FIX: Import explicit types from express to resolve type conflicts.
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

// FIX: Use explicit express types for request handlers to avoid conflicts.
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// FIX: Use explicit express types for error handlers to avoid conflicts.
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
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