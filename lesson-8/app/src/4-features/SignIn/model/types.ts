import { z } from 'zod';
import type { signInSchema } from './validator';

export type SignInFormValues = z.infer<typeof signInSchema>;
