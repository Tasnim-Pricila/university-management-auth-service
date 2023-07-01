import express from 'express';
import userRouter from '../modules/users/users.route';
import semesterRouter from '../modules/AcademicSemester/academicSemester.route';
import { academicFacultyRouter } from '../modules/AcademicFaculty/academicFaculty.route';
import { academicDepartmentRouter } from '../modules/AcademicDepartment/academicDepartment.route';
import { managementDepartmentRouter } from '../modules/managementDepartment/managementDepartment.route';
import { studentRouter } from '../modules/Student/student.route';
import { facultyRouter } from '../modules/Faculty/faculty.route';
import { adminRouter } from '../modules/Admin/admin.route';
import { authRouter } from '../modules/Auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/students',
    routes: studentRouter,
  },
  {
    path: '/faculties',
    routes: facultyRouter,
  },
  {
    path: '/admins',
    routes: adminRouter,
  },
  {
    path: '/users',
    routes: userRouter,
  },
  {
    path: '/semesters',
    routes: semesterRouter,
  },
  {
    path: '/faculty',
    routes: academicFacultyRouter,
  },
  {
    path: '/department',
    routes: academicDepartmentRouter,
  },
  {
    path: '/management-departments',
    routes: managementDepartmentRouter,
  },
  {
    path: '/auth',
    routes: authRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));

export default router;
