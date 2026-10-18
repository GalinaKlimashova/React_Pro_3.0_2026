import {
  confirmPasswordErrorMsg,
  confirmPasswordWarningMsg,
  emailErrorMsg,
  linkUrlErrorMsg,
  passwordErrorMsg,
  passwordMinLength,
  usernameErrorMsg,
  userNameMinLength
} from "@shared/constants";
import { z } from "zod";

export const linkSchema = z.object({
  link: z.string()
    .url(linkUrlErrorMsg)
});

export const groupRegistrationSchema = z.object({
  username: z.string().min(userNameMinLength, usernameErrorMsg),
  contactEmail: z.email({ message: emailErrorMsg }),
  passwordField: z.string()
    .min(passwordMinLength, passwordErrorMsg),
  confirmPassword: z.string()
    .min(passwordMinLength, confirmPasswordWarningMsg),
  linksArray: z.array(linkSchema)
  // don’t want to do
  // .min(1, linkArrayMinLengthMsg)
}).refine((data) => data.passwordField === data.confirmPassword, {
  message: confirmPasswordErrorMsg,
  path: ['confirmPassword'],
});

export type GroupRegistrationValues
  = z.infer<typeof groupRegistrationSchema>;

export const defaultValues: GroupRegistrationValues = {
  username: "",
  contactEmail: "",
  passwordField: "",
  confirmPassword: "",
  linksArray: [{ link: "" }]
};