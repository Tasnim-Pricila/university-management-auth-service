import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import { loginZodSchema, refreshTokenZodSchema } from './auth.validation';
import { loginController, refreshTokenController } from './auth.controller';
export const authRouter = express.Router();

authRouter.post('/login', validateRequest(loginZodSchema), loginController);
authRouter.post(
  '/refresh-token',
  validateRequest(refreshTokenZodSchema),
  refreshTokenController
);
