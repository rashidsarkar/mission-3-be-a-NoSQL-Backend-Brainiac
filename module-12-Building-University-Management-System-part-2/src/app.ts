import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlwares/globalErrorhandler';
import { notFound } from './app/middlwares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

//application routes

app.use('/api/v1', router);
app.get('/test', (req, res) => {
  Promise.reject();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(globalErrorHandler);
// not found route
app.use(notFound);

export default app;
