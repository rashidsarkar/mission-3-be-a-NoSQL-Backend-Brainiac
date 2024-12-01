/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { StudentService } from './student.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentService.getAllStudentsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'successfully data read',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentID } = req.params;
  const result = await StudentService.getSingleStudentFromDB(studentID);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'successfully data read',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res, next) => {
  const { studentID } = req.params;
  const result = await StudentService.deleteStudentFromDB(studentID);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'successfully data dated',
    data: result,
  });
});
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
