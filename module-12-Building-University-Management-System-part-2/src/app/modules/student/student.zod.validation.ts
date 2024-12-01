import { z } from 'zod';
// Validation schema for UserName
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .trim()
    .regex(/^[A-Z]/, 'First name should start with a capital letter'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
});

// Validation schema for Guardian
const guardianSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherContactNo: z.string().min(1, 'Father contact number is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  motherContactNo: z.string().min(1, 'Mother contact number is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required'),
});

// Validation schema for LocalGuardian
const localGuardianSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required'),
  contactNo: z.string().min(1, 'Local guardian contact number is required'),
  occupation: z.string().min(1, 'Local guardian occupation is required'),
  address: z.string().min(1, 'Local guardian address is required'),
});

// Main Student validation schema
export const studentZodValidationSchema = z.object({
  name: userNameSchema,
  id: z.string().min(1, 'Student ID is required'),
  password: z
    .string()
    .max(8)
    .min(1, ' Password should be 8 characters long')
    .min(6, ' Password should be at least 6 characters long'),
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Invalid gender' }),
  }),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  isDeleted: z.boolean().default(false),
  contactNo: z.string().min(1, 'Contact number is required'),
  emergencyContactNo: z.string().min(1, 'Emergency contact number is required'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+']).optional(),
  presentAddress: z.string().min(1, 'Present address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  avatar: z.string().optional(),
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked'], {
    errorMap: () => ({ message: 'Invalid status' }),
  }),
});
