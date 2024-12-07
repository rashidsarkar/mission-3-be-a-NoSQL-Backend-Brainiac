import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { academicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentService.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Department created successfully',
      data: result,
    });
  },
);
const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentService.getAllAcademicDepartmentFromDb();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Department retrieved successfully',
      data: result,
    });
  },
);
const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result =
      await academicDepartmentService.getSingleAcademicDepartmentFromDB(
        departmentId,
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Department retrieved successfully',
      data: result,
    });
  },
);
const upDateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;

    const result =
      await academicDepartmentService.upDateAcademicDepartmentIntoDB(
        departmentId,
        req.body,
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Department updated successfully',
      data: result,
    });
  },
);
export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  upDateAcademicDepartment,
};
