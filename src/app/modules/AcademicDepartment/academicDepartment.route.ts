import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
} from './academicDepartment.validation';
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
} from './academicDepartment.controller';

export const academicDepartmentRouter = express.Router();

academicDepartmentRouter.post(
  '/create-department',
  validateRequest(createAcademicDepartmentZodSchema),
  createDepartment
);

academicDepartmentRouter.get('/:id', getSingleDepartment);

academicDepartmentRouter.patch(
  '/:id',
  validateRequest(updateAcademicDepartmentZodSchema),
  updateDepartment
);

academicDepartmentRouter.delete('/:id', deleteDepartment);

academicDepartmentRouter.get('/', getAllDepartments);
