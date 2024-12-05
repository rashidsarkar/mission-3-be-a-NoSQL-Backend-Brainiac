import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
const router = express.Router();
router.post(
  '/create-academic-semester',
  academicSemesterControllers.createacademicSemester,
);
export const academicSemesterRoute = router;
