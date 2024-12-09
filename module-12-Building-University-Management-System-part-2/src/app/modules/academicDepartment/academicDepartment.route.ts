import express from 'express';
import { validatedRequest } from '../../middlwares/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();
router.get('/', academicDepartmentController.getAllAcademicDepartment);
router.get(
  '/:departmentId',
  academicDepartmentController.getSingleAcademicDepartment,
);
router.post(
  '/create-academic-department',
  // validatedRequest(
  //   academicDepartmentValidation.createAcademicDepartmentValidation,
  // ),
  academicDepartmentController.createAcademicDepartment,
);
router.patch(
  '/updated-academic-department/:departmentId',
  validatedRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidation,
  ),
  academicDepartmentController.upDateAcademicDepartment,
);
export const academicDepartmentRoutes = router;
