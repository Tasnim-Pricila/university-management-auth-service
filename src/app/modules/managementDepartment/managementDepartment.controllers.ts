import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import {
  createDepartmentService,
  deleteDepartmentService,
  getAllDepartmentsService,
  getSingleDepartmentService,
  updateDepartmentService,
} from './managementDepartment.service';
import { IManagementDepartment } from './managementDepartment.interface';
import { pick } from '../../../shared/pick';
import paginationFields from '../../../constants/pagination';

export const createDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...departmentData } = req.body;
    const result = await createDepartmentService(departmentData);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department created successfully',
      data: result,
    });
  }
);

export const getAllDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllDepartmentsService(filters, paginationOptions);

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management departments retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const getSingleDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleDepartmentService(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department retieved successfully',
      data: result,
    });
  }
);

export const updateDepartment = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await updateDepartmentService(id, updatedData);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department updated successfully',
      data: result,
    });
  })
);

export const deleteDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteDepartmentService(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department deleted successfully',
      data: result,
    });
  }
);
