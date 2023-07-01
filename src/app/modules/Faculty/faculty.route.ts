import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
  deleteFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
} from './faculty.controller';
import { updateFacultyZodSchema } from './faculty.validation';
import { auth } from '../../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enum/user';

export const facultyRouter = express.Router();
facultyRouter.get('/', auth(ENUM_USER_ROLE.STUDENT), getAllFaculties);

facultyRouter.get('/:id', getSingleFaculty);

facultyRouter.patch(
  '/:id',
  validateRequest(updateFacultyZodSchema),
  updateFaculty
);

facultyRouter.delete('/:id', deleteFaculty);
