import { Student } from '../student/student.model';
import { User } from './user.model';

const createUserIntoDb = async (userData) => {
  //   if (await Student.isUserExsits(userData.id)) {
  //     throw new Error('Student already exists');
  //   }
  const result = await User.create(userData);
  return result;
};
export const UserService = {
  createUserIntoDb,
};
