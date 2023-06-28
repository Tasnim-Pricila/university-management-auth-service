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

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(createManagementDepartmentZodSchema),
  createDepartment
);

router.get('/:id', getSingleDepartment);

router.patch(
  '/:id',
  validateRequest(updateManagementDepartmentZodSchema),
  updateDepartment
);

router.delete('/:id', deleteDepartment);

router.get('/', getAllDepartments);

export const ManagementDepartmentRoutes = router;
