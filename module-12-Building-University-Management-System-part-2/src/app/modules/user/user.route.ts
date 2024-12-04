import express, { NextFunction, Request, Response } from 'express';
import { UserControler } from './user.controller';
import { AnyZodObject } from 'zod';

import { validatedRequest } from '../../middlwares/validateRequest';
import { createtudentZodValidationSchema } from '../student/student.zod.validation';

const router = express.Router();

router.post(
  '/create-student',
  validatedRequest(createtudentZodValidationSchema),
  UserControler.createStudent,
);

export const UserRoutes = router;
