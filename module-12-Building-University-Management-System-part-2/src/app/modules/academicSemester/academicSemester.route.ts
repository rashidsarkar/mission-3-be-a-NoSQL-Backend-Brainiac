import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import { validatedRequest } from '../../middlwares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
const router = express.Router();
router.post(
  '/create-academic-semester',
  validatedRequest(
    academicSemesterValidation.createacademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createacademicSemester,
);
export const academicSemesterRoute = router;
