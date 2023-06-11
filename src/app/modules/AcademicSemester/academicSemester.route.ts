import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import createAcademicSemesterZodSchema from './academicSemester.validation';
import { createAcademicSemester } from './academicSemester.controller';

const semesterRouter = express.Router();

semesterRouter.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  createAcademicSemester
);

export default semesterRouter;
