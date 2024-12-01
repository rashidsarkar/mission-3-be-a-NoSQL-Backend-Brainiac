import express, { NextFunction, Request, Response } from 'express';
import { UserControler } from './user.controller';

const router = express.Router();
const senaBahini = (req: Request, res: Response, next: NextFunction) => {
  console.log(`i am sena`);
  next();
};

router.post('/create-student', senaBahini, UserControler.createStudent);

export const UserRoutes = router;
