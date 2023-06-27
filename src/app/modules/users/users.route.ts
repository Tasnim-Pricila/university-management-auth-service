import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import createUserZodSchema from './users.validation';
import { createStudent } from './users.controller';
const userRouter = express.Router();

userRouter.post(
  '/create-student',
  validateRequest(createUserZodSchema),
  createStudent
);
// userRouter.get('/', createUser)

export default userRouter;
