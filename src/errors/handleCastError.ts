import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../app/modules/users/interfaces/error';

const handleCastError = (err: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: err?.path,
      message: 'Invalid Id',
    },
  ];
  const statusCode = 500;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleCastError;
