import mongoose from 'mongoose';
import { TErrorSources, TgenericErrorResponse } from '../interface/error';

export const halndleValidationError = (
  err: mongoose.Error.ValidationError,
): TgenericErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    },
  );

  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSources,
  };
};
