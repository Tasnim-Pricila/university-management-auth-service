import express from 'express';
import { createUser } from './users.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import createUserZodSchema from './users.validation';
const userRouter = express.Router();

userRouter.post(
  '/create-user',
  validateRequest(createUserZodSchema),
  createUser
);
// userRouter.get('/', createUser)

export default userRouter;
