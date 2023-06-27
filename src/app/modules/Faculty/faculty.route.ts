import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
  deleteFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
} from './faculty.controller';
import { updateFacultyZodSchema } from './faculty.validation';

export const facultyRouter = express.Router();
facultyRouter.get('/', getAllFaculties);

facultyRouter.get('/:id', getSingleFaculty);

facultyRouter.patch(
  '/:id',
  validateRequest(updateFacultyZodSchema),
  updateFaculty
);

facultyRouter.delete('/:id', deleteFaculty);
