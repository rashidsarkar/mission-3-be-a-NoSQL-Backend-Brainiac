import express, { NextFunction, Request, Response } from 'express';
import { UserControler } from './user.controller';
import { AnyZodObject } from 'zod';

import { validatedRequest } from '../../middlwares/validateRequest';
import { createtudentZodValidationSchema } from '../student/student.zod.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  validatedRequest(createtudentZodValidationSchema),
  UserControler.createStudent,
);
router.post(
  '/create-faculty',
  validatedRequest(createFacultyValidationSchema),
  UserControler.createFaculty,
);
router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControler.createAdmin,
);

export const UserRoutes = router;
