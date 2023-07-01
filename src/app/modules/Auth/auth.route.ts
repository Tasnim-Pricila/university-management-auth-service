import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import { loginZodSchema } from './auth.validation';
import { loginController } from './auth.controller';
export const authRouter = express.Router();

authRouter.post('/login', validateRequest(loginZodSchema), loginController);
