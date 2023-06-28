import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
  createAdminZodSchema,
  createFacultyZodSchema,
  createUserZodSchema,
} from './users.validation';
import { createAdmin, createFaculty, createStudent } from './users.controller';
const userRouter = express.Router();

userRouter.post(
  '/create-student',
  validateRequest(createUserZodSchema),
  createStudent
);

userRouter.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  createFaculty
);

userRouter.post(
  '/create-admin',
  validateRequest(createAdminZodSchema),
  createAdmin
);

export default userRouter;
