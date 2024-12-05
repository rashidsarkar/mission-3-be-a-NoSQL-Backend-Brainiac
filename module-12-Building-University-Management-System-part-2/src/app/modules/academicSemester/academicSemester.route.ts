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
router.get('/', academicSemesterControllers.getacademicSemesterAll);
router.get(
  '/:semesterId',
  academicSemesterControllers.getSingleAcademicSemester,
);
router.patch(
  '/:semesterId',
  validatedRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.updateacademicSemester,
);
export const academicSemesterRoute = router;
