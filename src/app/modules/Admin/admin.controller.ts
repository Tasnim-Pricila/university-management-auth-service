import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constant';
import { IAdmin } from './admin.interface';
import { pick } from '../../../shared/pick';
import paginationFields from '../../../constants/pagination';
import {
  deleteAdminService,
  getAllAdminsService,
  getSingleAdminService,
  updateAdminService,
} from './admin.service';

export const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await getAllAdminsService(filters, paginationOptions);

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

export const getSingleAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleAdminService(id);

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin retrieved successfully !',
      data: result,
    });
  }
);

export const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await updateAdminService(id, updatedData);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully !',
    data: result,
  });
});
export const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await deleteAdminService(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully !',
    data: result,
  });
});
