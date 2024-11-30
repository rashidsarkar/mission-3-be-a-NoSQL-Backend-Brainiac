/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { StudentService } from './student.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'successfully data read',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentID } = req.params;
    const result = await StudentService.getSingleStudentFromDB(studentID);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'successfully data read',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentID } = req.params;
    const result = await StudentService.deleteStudentFromDB(studentID);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'successfully data dated',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
