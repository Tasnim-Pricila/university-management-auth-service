import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', router);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Unhandled')
// })

app.use(globalErrorHandler);

export default app;
