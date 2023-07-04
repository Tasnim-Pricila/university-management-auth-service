import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
  changePasswordZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
} from './auth.validation';
import {
  changePassword,
  loginController,
  refreshTokenController,
} from './auth.controller';
import { auth } from '../../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enum/user';
export const authRouter = express.Router();

authRouter.post('/login', validateRequest(loginZodSchema), loginController);
authRouter.post(
  '/refresh-token',
  validateRequest(refreshTokenZodSchema),
  refreshTokenController
);
authRouter.post(
  '/change-password',
  validateRequest(changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  changePassword
);
