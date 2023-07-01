import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { loginServices } from './auth.service';
import { ILoginResponse } from './auth.interface';
import config from '../../../config';

export const loginController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await loginServices(loginData);
    const { refreshToken, ...others } = result;

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshTooken', refreshToken, cookieOptions);

    sendResponse<ILoginResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully !',
      data: others,
    });
  }
);
