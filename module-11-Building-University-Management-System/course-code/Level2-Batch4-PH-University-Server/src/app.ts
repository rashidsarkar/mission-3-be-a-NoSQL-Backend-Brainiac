import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

//application routes

app.use('/api/v1/student', StudentRoutes);
app.use('/api/v1/users', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
export default app;