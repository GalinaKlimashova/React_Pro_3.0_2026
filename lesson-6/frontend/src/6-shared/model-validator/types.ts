import { z } from 'zod';
import type { userSchema } from './validator';

export type ProjectFormValues = z.infer<typeof userSchema>;
