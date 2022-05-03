import { ErrorRequestHandler } from 'express';

const error: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).end();
}

export default error;