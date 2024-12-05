import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  // .. create user object
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';
  // set manually id

  const generarteStudentId = (payload: TAcademicSemester) => {};
  // find academic semester info
  const admissionSemester = await AcademicSemester.

  userData.id = generarteStudentId();
  // create a user
  const newUser = await User.create(userData);
  // create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};
export const UserService = {
  createStudentIntoDb,
};
