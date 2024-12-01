import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
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
  createUser,
};
