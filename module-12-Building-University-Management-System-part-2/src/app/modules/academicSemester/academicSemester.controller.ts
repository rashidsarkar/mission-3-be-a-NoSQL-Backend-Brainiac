import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { academicSemesterService } from './academicSemester.service';
import { validatedRequest } from '../../middlwares/validateRequest';

const createacademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.createacademicSemesterIntoDB(
      req.body,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  },
);
const getacademicSemesterAll = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.getAllacademicSemesterFromDB();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester retrieved successfully',
      data: result,
    });
  },
);
const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { semesterId } = req.params;

    const result =
      await academicSemesterService.getSingleAcademicSemesterFromDB(semesterId);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester retrieved successfully',
      data: result,
    });
  },
);
const updateacademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { semesterId } = req.params;
    console.log(semesterId, req.body);
    const result =
      await academicSemesterService.updateSingleAcademicSemesterFromDB(
        semesterId,
        req.body,
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester updated successfully',
      data: result,
    });
  },
);

export const academicSemesterControllers = {
  createacademicSemester,
  getacademicSemesterAll,
  updateacademicSemester,
  getSingleAcademicSemester,
};
