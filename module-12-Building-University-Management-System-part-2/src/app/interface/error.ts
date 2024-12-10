export type TErrorSources = {
  path: string | number;
  message: string;
}[];
export type TgenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
