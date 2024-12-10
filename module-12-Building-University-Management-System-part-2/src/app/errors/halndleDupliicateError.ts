import { TErrorSources, TgenericErrorResponse } from '../interface/error';

export const halndleDupliicateError = (err): TgenericErrorResponse => {
  const statusCode = 400;
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];
  return {
    statusCode,
    message: 'invalid ID',
    errorSources,
  };
};
