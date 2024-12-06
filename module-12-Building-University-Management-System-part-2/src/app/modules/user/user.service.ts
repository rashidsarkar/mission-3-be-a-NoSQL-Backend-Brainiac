import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generarteStudentId } from './user.utils';

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

  userData.id = await generarteStudentId(admissionSemester);
  // create a user
  const newUser = await User.create(userData);
  // create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};
export const UserService = {
  createStudentIntoDb,
};
