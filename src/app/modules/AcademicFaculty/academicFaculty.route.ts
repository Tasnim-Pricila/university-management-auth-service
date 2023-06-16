import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
  createFacultyZodSchema,
  updatefacultyZodSchema,
} from './academicFaculty.validation';
import {
  createFaculty,
  deleteFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
} from './academicFaculty.controller';

export const academicFacultyRouter = express.Router();

academicFacultyRouter.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  createFaculty
);

academicFacultyRouter.get('/:id', getSingleFaculty);

academicFacultyRouter.patch(
  '/:id',
  validateRequest(updatefacultyZodSchema),
  updateFaculty
);

academicFacultyRouter.delete('/:id', deleteFaculty);

academicFacultyRouter.get('/', getAllFaculties);
