import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
} from './managementDepartment.validation';
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
} from './managementDepartment.controllers';

export const managementDepartmentRouter = express.Router();

managementDepartmentRouter.post(
  '/create-department',
  validateRequest(createManagementDepartmentZodSchema),
  createDepartment
);

managementDepartmentRouter.get('/:id', getSingleDepartment);

managementDepartmentRouter.patch(
  '/:id',
  validateRequest(updateManagementDepartmentZodSchema),
  updateDepartment
);

managementDepartmentRouter.delete('/:id', deleteDepartment);

managementDepartmentRouter.get('/', getAllDepartments);
