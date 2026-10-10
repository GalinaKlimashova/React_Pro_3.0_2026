import { z } from "zod";

// Описываем схему здесь
export const schema = z.object({
  username: z.string().min(3, "Имя должно быть не менее 3 символов"),
  email: z.string().email({ message: "Некорректный формат email" }),
});

// Автоматически вытаскиваем тип полей формы из схемы 
export type FormFieldsValues = z.infer<typeof schema>;

// Строим строгий тип стейта формы
export type FormState = {
  success: boolean;
  // Ключами объекта errors могут быть ТОЛЬКО реальные поля формы ('username' или 'email')
  errors: Partial<Record<keyof FormFieldsValues, string>>;
  message: string | null;
};
