import { z } from 'zod';
import type { signUpSchema } from './validator';

export type SignUpFormValues = z.infer<typeof signUpSchema>;
