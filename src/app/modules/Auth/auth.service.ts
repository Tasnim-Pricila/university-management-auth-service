import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/users.model';
import { IChangePassword, ILoginResponse, ILoginUser } from './auth.interface';
import config from '../../../config';
import { createToken, verifyToken } from '../../../helper/jwtHelpers';
import { JwtPayload, Secret } from 'jsonwebtoken';

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
    !(await user.isPasswordMatch(password, isUserExist.password))
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
export const refreshTokenServices = async (token: string) => {
  let verifiedToken;
  try {
    verifiedToken = verifyToken(token, config.jwt.refresh_secret as string);
    // console.log(verifiedToken);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }
  const { userId } = verifiedToken;
  const user = new User();

  const isUserExist = await user.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const accessToken = createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

export const changePasswordService = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  // // checking is user exist
  // const isUserExist = await User.isUserExist(user?.userId);

  //alternative way
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const userr = new User();

  // checking old password
  if (
    isUserExist.password &&
    !(await userr.isPasswordMatch(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  // // hash password before saving
  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_salt_rounds)
  // );

  // const query = { id: user?.userId };
  // const updatedData = {
  //   password: newHashedPassword,  //
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(), //
  // };

  // await User.findOneAndUpdate(query, updatedData);
  // data update
  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;

  // updating using save()
  isUserExist.save();
};
