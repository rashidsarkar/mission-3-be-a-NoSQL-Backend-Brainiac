import express from 'express';
import { StudentControllers } from './student.controller';
import { validatedRequest } from '../../middlwares/validateRequest';
import { updateStudentZodValidationSchema } from './student.zod.validation';
const router = express.Router();
// will call controller func
// router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);
router.get('/:studentID', StudentControllers.getSingleStudent);
router.delete('/:studentID', StudentControllers.deleteStudent);
router.patch(
  '/:studentID',
  validatedRequest(updateStudentZodValidationSchema),
  StudentControllers.updatedStudent,
);

export const StudentRoutes = router;
