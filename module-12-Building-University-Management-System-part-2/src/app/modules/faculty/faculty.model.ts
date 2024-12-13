import { model, Schema } from 'mongoose';
import { FacultyModel, TFaculty } from './faculty.interface';
import { userNameSchema } from '../student/student.model';

const facultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'], // Allowed values
        message: '{VALUE} is not valid', // Error message for invalid values
      },
      required: [true, 'Gender is required'], // Field is required
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+'], // Allowed blood groups
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImg: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);
facultySchema.virtual('fullName').get(function () {
  return `${this.name?.firstName} ${this.name?.middleName} ${this.name?.lastName}`;
});
facultySchema.statics.isUserExsits = async function (id) {
  const existingUser = await Faculty.findOne({ id: id });
  return existingUser;
};
export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);
