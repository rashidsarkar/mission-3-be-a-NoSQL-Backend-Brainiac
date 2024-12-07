import { z } from 'zod';

const academicFacultySchemaValidation = z.object({
  name: z.string({
    invalid_type_error: 'Invalid name',
  }),
});
export const academicFacultyValidation = {
  academicFacultySchemaValidation,
};
