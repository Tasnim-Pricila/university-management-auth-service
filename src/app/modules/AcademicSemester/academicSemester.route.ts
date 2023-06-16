import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from './academicSemester.validation';
import {
  createAcademicSemester,
  deleteSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
} from './academicSemester.controller';

const semesterRouter = express.Router();

semesterRouter.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  createAcademicSemester
);

semesterRouter.get('/:id', getSingleSemester);
semesterRouter.delete('/:id', deleteSemester);
semesterRouter.patch(
  '/:id',
  validateRequest(updateAcademicSemesterZodSchema),
  updateSemester
);

semesterRouter.get('/', getAllSemesters);

export default semesterRouter;
