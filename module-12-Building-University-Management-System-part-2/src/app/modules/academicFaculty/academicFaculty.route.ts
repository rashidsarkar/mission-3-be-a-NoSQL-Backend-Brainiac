import express from 'express';
import { validatedRequest } from '../../middlwares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { academicFacultyController } from './academicFaculty.controller';

const router = express.Router();
router.get('/', academicFacultyController.getAllAcademicFaculty);
router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty);
router.post(
  '/create-academic-faculty',
  validatedRequest(
    academicFacultyValidation.CreateAcademicFacultySchemaValidation,
  ),
  academicFacultyController.createAcademicFaculty,
);
router.patch(
  '/updated-academic-faculty/:facultyId',
  validatedRequest(
    academicFacultyValidation.CreateAcademicFacultySchemaValidation,
  ),
  academicFacultyController.upDateAcademicFaculty,
);
export const academicFacultyRoutes = router;
