import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/users.model';
import { ILoginResponse, ILoginUser } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { createToken } from '../../../helper/jwtHelpers';

export const loginServices = async (
  payload: ILoginUser
): Promise<ILoginResponse> => {
  const { id, password } = payload;

  const user = new User();

  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (
    isUserExist.password &&
    !user.isPasswordMatch(password, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = createToken(
    {
      userId,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    {
      userId,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};