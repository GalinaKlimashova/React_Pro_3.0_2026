import { emailField, nativeGeneralErrorMsg, usernameField } from '6-shared/constants';
import { schema } from './formTypes';
import type { FormState } from './formTypes';

export const initialFormState: FormState = {
    success: false,
    errors: {},
    message: null,
};

// Имитация серверного запроса (Server Action)
export async function submitFormAction(prevState: FormState | null, formData: FormData): Promise<FormState | null> {
    // eslint-disable-next-line
    console.log("prevState: ", prevState);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const rawData = {
        username: formData.get(usernameField),
        contactEmail: formData.get(emailField),
    };
    // Валидируем данные через Zod
    const validatedFields = schema.safeParse(rawData);

    if (!validatedFields.success) {
        // Форматируем ошибки Zod в плоский объект
        const fieldErrors: Record<string, string> = {};
        validatedFields.error.issues.forEach((issue) => {
            if (issue.path[0]) fieldErrors[issue.path[0].toString()] = issue.message;
        });

        return {
            success: false,
            errors: fieldErrors,
            message: nativeGeneralErrorMsg,
        };
    }

    // Возвращаем initialState — useActionState сбросит state и браузер очистит форму
    // Это встроенное поведение React 19: при возврате initialState поля формы очистятся
    return initialFormState as FormState;
}
