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
router.patch(
  '/updated-course/:id',
  validatedRequest(courseValidation.updateCourseValidationSchema),
  courseController.upDateCourse,
);
router.delete('/delete-course/:id', courseController.deleteCourse);
router.put(
  '/:courseId/assign-faculties',
  validatedRequest(courseValidation.assignFacultiesWithCourseValidationSchema),
  courseController.assignFaculties,
);
export const courseRoute = router;
