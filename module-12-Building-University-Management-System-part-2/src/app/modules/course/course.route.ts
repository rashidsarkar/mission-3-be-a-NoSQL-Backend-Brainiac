import express from 'express';
import { validatedRequest } from '../../middlwares/validateRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';

const router = express.Router();
router.get('/', courseController.getAllCourse);
router.get('/:id', courseController.getSingleCourse);
router.post(
  '/create-course',
  validatedRequest(courseValidation.createCourseValidationSchema),
  courseController.createCourse,
);
// router.patch(
//   '/updated-academic-faculty/:facultyId',
//   validatedRequest(courseValidation.CreateAcademicFacultySchemaValidation),
//   courseController.upDateAcademicFaculty,
// );
router.delete('/delete-course', courseController.deleteCourse);
export const courseRoute = router;
