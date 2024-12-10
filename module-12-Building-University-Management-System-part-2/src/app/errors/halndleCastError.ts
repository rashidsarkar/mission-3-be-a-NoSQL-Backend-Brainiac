import mongoose from 'mongoose';
import { TErrorSources, TgenericErrorResponse } from '../interface/error';

export const halndleCastError = (
  err: mongoose.Error.CastError,
): TgenericErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};
