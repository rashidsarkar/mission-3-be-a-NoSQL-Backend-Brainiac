import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { academicFacultyService } from './academicFaculty.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.createAcademicFacultyIntoDB(
      req.body,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty created successfully',
      data: result,
    });
  },
);
const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.getAllAcademicFacultyFromDb();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty retrieved successfully',
      data: result,
    });
  },
);
const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result =
      await academicFacultyService.getSingleAcademicFacultyFromDB(facultyId);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty retrieved successfully',
      data: result,
    });
  },
);
const upDateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;

    const result = await academicFacultyService.upDateAcademicFacultyIntoDB(
      facultyId,
      req.body,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  },
);
export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  upDateAcademicFaculty,
};
