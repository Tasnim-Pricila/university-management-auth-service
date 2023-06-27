import express from 'express';
import { StudentController } from './student.controller';
import { StudentValidaion } from './student.validation';
import { validateRequest } from '../../../middlewares/validateRequest';
export const studentRouter = express.Router();

studentRouter.get('/:id', StudentController.getSingleStudent);
studentRouter.get('/', StudentController.getAllStudents);

studentRouter.delete('/:id', StudentController.deleteStudent);

studentRouter.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent
);
