import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createacademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    let result = 4;
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  },
);

export const academicSemesterControllers = {
  createacademicSemester,
};
