import { z } from "zod";

export const passengerSchema = z.object({
  firstName: z
    .string()
    .min(1, "Имя обязательно")
    .regex(/^[\p{L}\s-]+$/u, {
      message: "Имя должно содержать только буквы",
    }),
  lastName: z
    .string()
    .min(1, "Фамилия обязательна")
    .regex(/^[\p{L}\s-]+$/u, {
      message: "Фамилия должна содержать только буквы",
    }),
});

export const groupRegistrationSchema = z.object({
  groupName: z.string().min(3, "Название должно быть не менее 3 символов"),
  contactEmail: z.email({ message: "Некорректный формат email" }),
  passengers: z
    .array(passengerSchema)
    .min(1, "Должен быть минимум один пассажир"),
});

export type GroupRegistrationValues = z.infer<typeof groupRegistrationSchema>;

export const defaultValues: GroupRegistrationValues = {
  groupName: "",
  contactEmail: "",
  passengers: [{ firstName: "", lastName: "" }],
};
