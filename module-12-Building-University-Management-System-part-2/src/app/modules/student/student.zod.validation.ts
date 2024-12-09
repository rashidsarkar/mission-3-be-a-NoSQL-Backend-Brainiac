import { z } from 'zod';
// Validation schema for UserName
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .trim()
    .regex(/^[A-Z]/, 'First name should start with a capital letter'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
});

// Validation schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherContactNo: z.string().min(1, 'Father contact number is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  motherContactNo: z.string().min(1, 'Mother contact number is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required'),
});

// Validation schema for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required'),
  contactNo: z.string().min(1, 'Local guardian contact number is required'),
  occupation: z.string().min(1, 'Local guardian occupation is required'),
  address: z.string().min(1, 'Local guardian address is required'),
});

// Main Student validation schema
const createtudentZodValidationSchema = z.object({
  body: z.object({
    password: z.string().max(8),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        errorMap: () => ({ message: 'Invalid gender' }),
      }),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is required'),

      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+'])
        .optional(),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      avatar: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

// Validation schema for updating UserName
const userNameUpdateValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .trim()
    .regex(/^[A-Z]/, 'First name should start with a capital letter')
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
});

// Validation schema for updating Guardian
const guardianUpdateValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required').optional(),
  fatherContactNo: z
    .string()
    .min(1, 'Father contact number is required')
    .optional(),
  fatherOccupation: z
    .string()
    .min(1, 'Father occupation is required')
    .optional(),
  motherName: z.string().min(1, 'Mother name is required').optional(),
  motherContactNo: z
    .string()
    .min(1, 'Mother contact number is required')
    .optional(),
  motherOccupation: z
    .string()
    .min(1, 'Mother occupation is required')
    .optional(),
});

// Validation schema for updating LocalGuardian
const localGuardianUpdateValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required').optional(),
  contactNo: z
    .string()
    .min(1, 'Local guardian contact number is required')
    .optional(),
  occupation: z
    .string()
    .min(1, 'Local guardian occupation is required')
    .optional(),
  address: z.string().min(1, 'Local guardian address is required').optional(),
});

// Main Student update validation schema
const updateStudentZodValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: userNameUpdateValidationSchema.optional(),
      gender: z
        .enum(['male', 'female'], {
          errorMap: () => ({ message: 'Invalid gender' }),
        })
        .optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is required')
        .optional(),
      contactNo: z.string().min(1, 'Contact number is required').optional(),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required')
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+'])
        .optional(),
      presentAddress: z
        .string()
        .min(1, 'Present address is required')
        .optional(),
      permanentAddress: z
        .string()
        .min(1, 'Permanent address is required')
        .optional(),
      guardian: guardianUpdateValidationSchema.optional(),
      localGuardian: localGuardianUpdateValidationSchema.optional(),
      avatar: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export { createtudentZodValidationSchema, updateStudentZodValidationSchema };
