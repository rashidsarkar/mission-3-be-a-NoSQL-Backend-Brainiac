import { z } from 'zod';

const CreateAcademicFacultySchemaValidation = z.object({
  name: z.string({
    invalid_type_error: 'Invalid name',
  }),
});

export const academicFacultyValidation = {
  CreateAcademicFacultySchemaValidation,
};
