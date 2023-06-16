import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import createAcademicSemesterZodSchema from './academicSemester.validation';
import {
  createAcademicSemester,
  getAllSemesters,
  getSingleSemester,
} from './academicSemester.controller';

const semesterRouter = express.Router();

semesterRouter.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  createAcademicSemester
);

semesterRouter.get('/:id', getSingleSemester);

semesterRouter.get('/', getAllSemesters);

export default semesterRouter;
