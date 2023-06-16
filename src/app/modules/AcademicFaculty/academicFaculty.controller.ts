import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import { Request, Response } from 'express';
import {
  createFacultyServices,
  deleteByIdFromDBServices,
  getAllFacultiesServices,
  getSingleFacultyServices,
  updateFacultyServices,
} from './academicFaculty.service';
import { pick } from '../../../shared/pick';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import paginationFields from '../../../constants/pagination';

export const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await createFacultyServices(academicFacultyData);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

export const getAllFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllFacultiesServices(filters, paginationOptions);

    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculties retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const getSingleFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleFacultyServices(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty fetched successfully',
      data: result,
    });
  }
);

export const updateFaculty = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await updateFacultyServices(id, updatedData);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  })
);

export const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteByIdFromDBServices(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty deleted successfully',
    data: result,
  });
});
