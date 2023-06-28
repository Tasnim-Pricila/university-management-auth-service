import express from 'express';
import {
  deleteAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
} from './admin.controller';
import { updateAdminZodSchema } from './admin.validation';
import { validateRequest } from '../../../middlewares/validateRequest';

export const adminRouter = express.Router();

adminRouter.get('/:id', getSingleAdmin);
adminRouter.get('/', getAllAdmins);

adminRouter.delete('/:id', deleteAdmin);

adminRouter.patch('/:id', validateRequest(updateAdminZodSchema), updateAdmin);
