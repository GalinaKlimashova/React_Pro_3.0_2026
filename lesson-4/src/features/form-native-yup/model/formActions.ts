import {
  emailField,
  nativeGeneralErrorMsg,
  requestSuccessMsg,
  submitMsg,
  usernameField
} from "@shared/constants";
import { schema } from "./formTypes";
import type { FormState } from "./formTypes";
import * as Yup from "yup";

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

  // Валидируем данные через Yup
  try {
    await schema.validate(rawData, { abortEarly: false });
  } catch (validationErrors) {
    // Форматируем ошибки Yup в плоский объект
    const fieldErrors: Record<string, string> = {};
    if (validationErrors && typeof validationErrors === "object" && "inner" in validationErrors) {
      const yupErrors = validationErrors as Yup.ValidationError;
      yupErrors.inner.forEach((issue) => {
        if (issue.path) fieldErrors[issue.path] = issue.message;
      });
    }

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
  console.log(`${submitMsg}`, rawData);

  return {
    success: true,
    errors: {},
    message: `${rawData.username}, ${requestSuccessMsg}`,
    fields: {
      username: rawData.username?.toString() ?? "",
      contactEmail: rawData.contactEmail?.toString() ?? ""
    }
  };
}
