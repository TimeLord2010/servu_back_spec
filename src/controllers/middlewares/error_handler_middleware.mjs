import { ZodError } from "zod";

/**
 *
 * @param {*} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {() => void} next
 */
export function errorHandlerMiddleware(err, req, res, next) {
  console.error(err.stack);

  if (err instanceof ZodError) {
    res.status(422).json({
      issues: err.issues,
    });
  }

  res.status(err.status || err.statusCode || 500).json({
    error: {
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
}
