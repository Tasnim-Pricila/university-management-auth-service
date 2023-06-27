import { Request, RequestHandler, Response } from 'express';
import { createStudentServices } from './users.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

export const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await createStudentServices(student, userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All users get successfully',
      data: result,
    });
  }
);
