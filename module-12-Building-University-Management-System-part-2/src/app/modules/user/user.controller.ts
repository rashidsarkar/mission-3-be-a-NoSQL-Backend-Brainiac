import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserService.createStudentIntoDb(password, studentData);
  // console.log(result);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Student is created successfully ..',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const result = await UserService.createFacultyIntoDB(password, facultyData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});
export const UserControler = {
  createStudent,
  createFaculty,
  createAdmin,
};
