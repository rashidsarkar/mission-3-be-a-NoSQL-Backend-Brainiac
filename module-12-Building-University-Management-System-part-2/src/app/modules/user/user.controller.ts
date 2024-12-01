import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserService.createStudentIntoDb(password, studentData);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const UserControler = {
  createStudent,
};
