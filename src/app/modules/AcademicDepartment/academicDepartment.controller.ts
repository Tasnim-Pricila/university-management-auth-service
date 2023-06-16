import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import { pick } from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import {
  createDepartmentServices,
  deleteDepartmentServices,
  getAllDepartmentsServices,
  getSingleDepartmentServices,
  updateDepartmentServices,
} from './academicDepartment.service';
import paginationFields from '../../../constants/pagination';

export const createDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body;
    const result = await createDepartmentServices(academicDepartmentData);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department created successfully',
      data: result,
    });
  }
);

export const getAllDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllDepartmentsServices(filters, paginationOptions);

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic departments fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const getSingleDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleDepartmentServices(id);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department fetched successfully',
      data: result,
    });
  }
);

export const updateDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await updateDepartmentServices(id, req.body);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department updated successfully',
      data: result,
    });
  }
);

export const deleteDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteDepartmentServices(id);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department deleted successfully',
      data: result,
    });
  }
);
