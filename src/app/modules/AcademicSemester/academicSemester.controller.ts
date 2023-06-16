import { Request, Response } from 'express';
import {
  createSemester,
  getAllSemestersServices,
  getSingleSemesterServices,
} from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { pick } from '../../../shared/pick';
import paginationFields from '../../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterableFields } from './academicSemester.constants';

export const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createSemester(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully',
      data: result,
    });
  }
);

export const getAllSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);
    const filters = pick(req.query, academicSemesterFilterableFields);
    const result = await getAllSemestersServices(filters, paginationOptions);
    // console.log(paginationOptions);

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester get successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const getSingleSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getSingleSemesterServices(req.params.id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester get successfully',
      data: result,
    });
  }
);
