import { schema } from "./form.types"; 
import type { FormState } from "./form.types";

export const initialFormState: FormState = {
  success: false,
  errors: {},
  message: null,
};

// Имитация серверного запроса (Server Action)
export async function submitFormAction(prevState: FormState, formData: FormData): Promise<FormState> {
  // Искусственная задержка сети (2 секунды)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Получаем сырые данные из нативной FormData
  const rawData = {
    username: formData.get("username"),
    email: formData.get("email"),
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
      message: "Пожалуйста, исправьте ошибки в форме",
    };
  }

  // Бизнес-логика (например, отправка в базу данных)
  console.log("Данные успешно отправлены:", validatedFields.data);

  return {
    success: true,
    errors: {},
    message: `Пользователь ${validatedFields.data.username} успешно зарегистрирован!`,
  };
}
