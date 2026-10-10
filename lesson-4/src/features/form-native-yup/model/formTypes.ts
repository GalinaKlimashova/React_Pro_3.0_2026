import * as Yup from "yup";
import {
  emailErrorMsg,
  requiredMessage,
  usernameErrorMsg,
  userNameMinLength
} from "@shared/constants";

export type FieldsTitles = "username" | "contactEmail";

export type FormFieldsType = {
  username: string,
  contactEmail: string,
};
const yupMarker = " <----- it is from Yup";
// Описываем схему здесь через Yup
export const schema = Yup.object({
  username: Yup.string()
    .required(requiredMessage + yupMarker)
    .min(userNameMinLength, usernameErrorMsg + yupMarker),
  contactEmail: Yup.string()
    .required(requiredMessage + yupMarker)
    .email(emailErrorMsg + yupMarker),
});

// Строковый тип стейта формы
export type FormState = {
  success: boolean;
  errors: Partial<Record<keyof FormFieldsType, string>>;
  message: string | null;
  fields: FormFieldsType;
};

export type InfoNodeType = {
  currentLabel: string;
  currentField: string;
  isPending: boolean;
  state: FormState;
  placeholder: string;
  currentFieldType: string;
  setUpdatedState: React.Dispatch<React.SetStateAction<string>>
};

export type MiddlewareStepType = {
  stepContent: InfoNodeType[],
  state?: FormState
}
