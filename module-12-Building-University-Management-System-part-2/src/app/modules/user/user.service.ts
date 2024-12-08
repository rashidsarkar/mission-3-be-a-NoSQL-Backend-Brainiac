import { startSession } from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { StatusCodes } from 'http-status-codes';

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  // .. create user object
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';
  // set manually id
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await startSession();

  try {
    session.startTransaction();
    if (!admissionSemester) {
      throw new AppError(404, 'admission Semester not found');
    }
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array [0] e data ta thakbe
    // create a student
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
export const UserService = {
  createStudentIntoDb,
};
