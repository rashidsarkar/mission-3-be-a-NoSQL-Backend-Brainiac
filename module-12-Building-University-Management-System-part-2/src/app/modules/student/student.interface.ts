import { Model, Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
};
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  contactNo: string;
  occupation: string;
  address: string;
};
export type TStudent = {
  id: string;
  name: TUserName;
  password: string;
  isDeleted: boolean;
  user: Types.ObjectId;
  gender: 'male' | 'female';
  dateOfBirth?: Date;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  email: string;
  avatar?: string;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
};

// for creating instance
// export type StudentMethods = {
//   isUserExsits(id: string): Promise<TStudent | null>;
// };
// // Create a new Model type that knows about IUserMethods...
// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
//for creating static methods
export interface StudentModel extends Model<TStudent> {
  isUserExsits(id: string): Promise<TStudent | null>;
}
