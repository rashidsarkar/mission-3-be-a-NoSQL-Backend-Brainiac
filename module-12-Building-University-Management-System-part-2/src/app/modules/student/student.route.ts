import express from 'express';
import { StudentControllers } from './student.controller';
const router = express.Router();
// will call controller func
// router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);
router.get('/:studentID', StudentControllers.getSingleStudent);
router.delete('/:studentID', StudentControllers.deleteStudent);
router.patch('/:studentID', StudentControllers.updatedStudent);

export const StudentRoutes = router;
