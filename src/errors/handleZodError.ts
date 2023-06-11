import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../app/modules/users/interfaces/common';
import { IGenericErrorMessage } from '../app/modules/users/interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 500;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
