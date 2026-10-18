import {
  emailField,
  nativeGeneralErrorMsg,
  requestSuccessMsg,
  submitMsg,
  usernameField
} from "@shared/constants";
import { schema } from "./formTypes";
import type { FormState } from "./formTypes";

export const initialFormState: FormState = {
  success: false,
  errors: {},
  message: null,
  fields: {
    username: "",
    contactEmail: ""
  }
};

// Имитация серверного запроса (Server Action)
export async function submitFormAction(
  prevState: FormState,
  formData: FormData): Promise<FormState> {

  console.log("prevState: ", prevState);
  // Искусственная задержка сети (2 секунды)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Получаем сырые данные из нативной FormData
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
      fields: {
        username: rawData.username?.toString() ?? "",
        contactEmail: rawData.contactEmail?.toString() ?? ""
      }
    };
  }

  // Бизнес-логика (например, отправка в базу данных)
  console.log(`${submitMsg}`, validatedFields.data);

  return {
    success: true,
    errors: {},
    message: `${validatedFields.data.username}, ${requestSuccessMsg}`,
    fields: {
      username: rawData.username?.toString() ?? "",
      contactEmail: rawData.contactEmail?.toString() ?? ""
    }
  };
}
