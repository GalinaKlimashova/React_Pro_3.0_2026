import { emailErrorMsg, usernameErrorMsg, userNameMinLength } from '6-shared/constants';
import { z } from 'zod';

export type FieldsTitles = 'username' | 'contactEmail';

export type FormFieldsType = {
    username: string;
    contactEmail: string;
};

// Описываем схему здесь
export const schema = z.object({
    username: z.string().min(userNameMinLength, usernameErrorMsg),
    contactEmail: z.string().email({ message: emailErrorMsg }),
});

// Автоматически вытаскиваем тип полей формы из схемы
export type FormFieldsValues = z.infer<typeof schema>;

// Строим строгий тип стейта формы
export type FormState = {
    success: boolean;
    errors: Partial<Record<keyof FormFieldsValues, string>>;
    message: string | null;
};

export type InfoNodeType = {
    currentLabel: string;
    currentField: string;
    isPending: boolean;
    state: FormState | null;
    placeholder: string;
    currentFieldType: string;
};

export type MiddlewareStepType = {
    stepContent: InfoNodeType[];
    state?: FormState;
};
