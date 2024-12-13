import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { courseServices } from './course.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseServices.createCourseIntoDb(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});
const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseServices.getAllCourseFromDb(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course retrieved successfully',
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course retrieved successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await courseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course Delete successfully',
    data: result,
  });
});

// const upDateCourse = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const result = await courseServices.(facultyId, req.body);
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Course updated successfully',
//     data: result,
//   });
// });
export const courseController = {
  createCourse,
  getAllCourse,
  deleteCourse,
  getSingleCourse,
};
