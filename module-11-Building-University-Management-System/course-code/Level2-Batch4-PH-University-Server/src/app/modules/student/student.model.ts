import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import config from '../../config';

// Schema for user name details
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'], // Field is required

    validate: {
      validator: function (value: string) {
        const firstStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstStr === value;
      },
      message:
        '{VALUE} is not valid. First name should start with a capital letter',
    },
  },
  middleName: {
    type: String, // Optional field
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'], // Field is required
  },
});

// Schema for guardian details
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'], // Field is required
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'], // Field is required
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'], // Field is required
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'], // Field is required
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required'], // Field is required
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'], // Field is required
  },
});

// Schema for local guardian details
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required'], // Field is required
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required'], // Field is required
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required'], // Field is required
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required'], // Field is required
  },
});

// Main student schema
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    name: {
      type: userNameSchema,
      required: true, // Field is required
    },
    id: {
      type: String,
      required: [true, 'Student ID is required'], // Field is required
      unique: true, // Ensures ID is unique
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'], // Allowed values
        message: '{VALUE} is not valid', // Error message for invalid values
      },
      required: [true, 'Gender is required'], // Field is required
    },
    dateOfBirth: {
      type: String, // Optional field
    },
    email: {
      type: String,
      required: [true, 'Email is required'], // Field is required
      unique: true, // Ensures email is unique
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required'], // Field is required
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'], // Field is required
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+'], // Allowed blood groups
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'], // Field is required
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'], // Field is required
    },
    guardian: {
      type: guardianSchema,
      required: true, // Field is required
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true, // Field is required
    },
    avatar: {
      type: String, // Optional field
    },
    profileImg: {
      type: String, // Optional field
    },
    isActive: {
      type: String,
      enum: ['active', 'blocked'], // Allowed values
      required: [true, 'Active status is required'], // Field is required
    },
    isDeleted: {
      type: Boolean,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// pre save middleaware / hook
studentSchema.pre('save', async function (next) {
  // code to be executed before saving the document
  // console.log(this, 'pre hook code to be executed before saving the document');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  //hashing password and save in db
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt));
  next();
});
// post save middleware / hook
studentSchema.post('save', function (doc, next) {
  // code to be executed after saving the document
  doc.password = '';
  next();
});
studentSchema.pre('find', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  // console.log(this);
  this.findOne({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  // console.log(this);
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

//victual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// // Export the Student model
// studentSchema.methods.isUserExsits = async function (id: string) {
//   const existingUser = await Student.findOne({ id: id });
//   return existingUser;
// };

// creating a custom static method
studentSchema.statics.isUserExsits = async function (id) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
