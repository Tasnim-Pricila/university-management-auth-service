import express from 'express';
import userRouter from '../modules/users/users.route';
import semesterRouter from '../modules/AcademicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    routes: userRouter,
  },
  {
    path: '/semesters',
    routes: semesterRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));

export default router;
