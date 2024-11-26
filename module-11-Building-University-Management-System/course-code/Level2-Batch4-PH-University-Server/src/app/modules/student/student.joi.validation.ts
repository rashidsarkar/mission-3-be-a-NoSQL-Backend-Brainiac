import Joi from 'joi';

const studentValidationSchema = Joi.object({
  name: Joi.object({
    firstName: Joi.string()
      .max(20)
      .trim()
      .regex(/^[A-Z][a-z]+$/)
      .required()
      .messages({
        'string.pattern.base': 'First name should start with a capital letter',
        'string.empty': 'First name is required',
        'string.max': 'First name cannot be more than 20 characters',
      }),
    middleName: Joi.string().optional(),
    lastName: Joi.string().required().messages({
      'string.empty': 'Last name is required',
    }),
  }),
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': 'Gender must be either male or female',
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+')
    .optional()
    .messages({
      'any.only': 'Invalid blood group',
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent address is required',
  }),
  guardian: Joi.object({
    fatherName: Joi.string().required().messages({
      'string.empty': 'Father name is required',
    }),
    fatherContactNo: Joi.string().required().messages({
      'string.empty': 'Father contact number is required',
    }),
    fatherOccupation: Joi.string().required().messages({
      'string.empty': 'Father occupation is required',
    }),
    motherName: Joi.string().required().messages({
      'string.empty': 'Mother name is required',
    }),
    motherContactNo: Joi.string().required().messages({
      'string.empty': 'Mother contact number is required',
    }),
    motherOccupation: Joi.string().required().messages({
      'string.empty': 'Mother occupation is required',
    }),
  }),
  localGuardian: Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Local guardian name is required',
    }),
    contactNo: Joi.string().required().messages({
      'string.empty': 'Local guardian contact number is required',
    }),
    occupation: Joi.string().required().messages({
      'string.empty': 'Local guardian occupation is required',
    }),
    address: Joi.string().required().messages({
      'string.empty': 'Local guardian address is required',
    }),
  }),
  avatar: Joi.string().optional(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').required().messages({
    'any.only': 'Active status must be either active or blocked',
    'string.empty': 'Active status is required',
  }),
});
export default studentValidationSchema;
