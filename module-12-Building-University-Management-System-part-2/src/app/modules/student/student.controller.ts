import { StudentService } from './student.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentsFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'successfully data read',
    data: result,
  });
});
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentID } = req.params;
  const result = await StudentService.getSingleStudentFromDB(studentID);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'successfully data read',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const { studentID } = req.params;
  const result = await StudentService.deleteStudentFromDB(studentID);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'successfully data dated',
    data: result,
  });
});

const updatedStudent = catchAsync(async (req, res) => {
  const { studentID } = req.params;
  const { student } = req.body;

  const result = await StudentService.updatedStudentFromDb(studentID, student);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: ' student updated done ',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updatedStudent,
};
