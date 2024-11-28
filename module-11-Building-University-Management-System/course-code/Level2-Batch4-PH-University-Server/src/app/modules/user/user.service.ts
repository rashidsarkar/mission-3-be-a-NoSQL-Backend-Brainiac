import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { NewUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  // .. create user object
  const user: NewUser = {};

  user.password = password || (config.default_pass as string);

  // set student role
  user.role = 'student';
  // set manually id
  user.id = '2030100001';
  // create a user
  const result = await User.create(user);
  // create a student
  if (Object.keys(result).length) {
    // set id , _id as user
    studentData.id = result.id;
    studentData.user = result._id;
  }
  return result;
};
export const UserService = {
  createUserIntoDb,
};
