import express, { Application } from 'express';
import cors from 'cors';
import userRouter from './app/modules/users/users.route';
import globalErrorHandler from './middlewares/globalErrorHandler';
import semesterRouter from './app/modules/AcademicSemester/academicSemester.route';

const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users/', userRouter);
app.use('/api/v1/semesters/', semesterRouter);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Unhandled')
// })

app.use(globalErrorHandler);

export default app;
