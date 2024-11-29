import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'API not Found',
    error: '',
  });
  next();
};
