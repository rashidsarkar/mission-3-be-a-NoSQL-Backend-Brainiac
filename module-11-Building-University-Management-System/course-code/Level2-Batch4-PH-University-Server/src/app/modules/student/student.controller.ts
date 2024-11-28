/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { StudentService } from './student.service';
import { z } from 'zod';
import { studentZodValidationSchema } from './student.zod.validation';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     //creating a schema validation using zod
//     const { student: studentData } = req.body;
//     const zodParseData = studentZodValidationSchema.parse(studentData);

//     // will call service func to sent this data
//     const result = await StudentService.createStudentIntoDB(zodParseData);
//     // sent response
//     res.status(200).json({
//       success: true,
//       message: 'Student is created successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Student is not created ',
//       error: error,
//     });
//   }
// };
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'successfully data read',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await StudentService.getSingleStudentFromDB(studentID);
    res.status(200).json({
      success: true,
      message: 'successfully data read',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await StudentService.deleteStudentFromDB(studentID);
    res.status(200).json({
      success: true,
      message: 'successfully data deted',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
