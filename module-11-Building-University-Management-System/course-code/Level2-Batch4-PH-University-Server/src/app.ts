import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { userRoutes } from './app/modules/user/user.route';
import { globalErrorHandler } from './app/middlwares/globalErrorhandler';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

//application routes

app.use('/api/v1/student', StudentRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(globalErrorHandler);

export default app;
