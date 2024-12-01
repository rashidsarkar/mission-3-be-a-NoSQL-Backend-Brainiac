import { z } from 'zod';

export const userSchemaValidation = z.object({
  password: z
    .string({
      invalid_type_error: ' Password must be a string',
    })
    .max(20, {
      message: 'Password must be less than 20 characters',
    })
    .optional(),
});
