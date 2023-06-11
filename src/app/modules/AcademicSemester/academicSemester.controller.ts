import { RequestHandler } from 'express';
import { createSemester } from './academicSemester.service';

export const createAcademicSemester: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const result = await createSemester(req.body);
    res.status(200).json({
      success: true,
      message: 'Semester created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
