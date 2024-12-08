import { startSession } from 'mongoose';
import AppError from '../../errors/AppError';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import { User } from '../user/user.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExsits(studentData.id)) {
    throw new AppError(409, 'User already exists');
    // }
  }
  const result = await Student.create(studentData); // built in static method

  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(404, 'Failed to deleted student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(404, 'Failed to deleted user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
