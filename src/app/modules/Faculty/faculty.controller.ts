/* eslint-disable no-console */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { pick } from '../../../shared/pick';
import paginationFields from '../../../constants/pagination';
import {
  deleteFacultyServices,
  getAllFacultiesServices,
  getSingleFacultyServices,
  updateFacultyServices,
} from './faculty.service';

export const getAllFaculties = catchAsync(
  async (req: Request, res: Response) => {
    // console.log(req.user);
    const filters = pick(req.query, facultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllFacultiesServices(filters, paginationOptions);

    sendResponse<IFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculties retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const getSingleFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleFacultyServices(id);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculty retrieved successfully !',
      data: result,
    });
  }
);

export const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await updateFacultyServices(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty updated successfully !',
    data: result,
  });
});

export const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await deleteFacultyServices(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty deleted successfully !',
    data: result,
  });
});
