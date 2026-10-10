import { zodResolver } from "@hookform/resolvers/zod";
import {
  buttonSubmitTitle,
  submitButtonType,
  confirmationPasswordLabel,
  confirmationPasswordPlaceholder,
  confirmPasswordField,
  emailField,
  emailLabel,
  emailPlaceholder,
  linkAddBtn,
  linkDeleteBtn,
  linkPlaceholder,
  linksArray,
  linksSubLabel,
  passwordField,
  passwordLabel,
  passwordPlaceholder,
  socialLinksLabel,
  submitMsg,
  usernameField,
  usernameLabel,
  usernamePlaseholder
} from "@shared/constants";
import { useFieldArray, useForm } from "react-hook-form";
import styles from "@shared/css-files/GeneralStylesForm.module.css";
import type { GroupRegistrationValues } from "../model";
import { defaultValues, groupRegistrationSchema } from "../model";
import { getArrayNode } from "./getArrayNode";
import { getInfoNode } from "./getInfoNode";

export const RhfForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<GroupRegistrationValues>({
    resolver: zodResolver(groupRegistrationSchema),
    defaultValues,
    mode: "onTouched",
  });

  const { fields: linksFields,
    append: appendLink,
    remove: removeLink } = useFieldArray({
      control,
      name: linksArray
    });

  const onSubmit = (values: GroupRegistrationValues) => {
    alert(JSON.stringify(values, null, 2));
    console.log(`${submitMsg}`, values);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        {/* username */}
        {getInfoNode({
          register,
          registerName: usernameField,
          currentLabel: usernameLabel,
          errors: errors[usernameField],
          touchedFields: touchedFields[usernameField],
          placeholder: usernamePlaseholder
        })}
        {/* email */}
        {getInfoNode({
          register,
          registerName: emailField,
          currentLabel: emailLabel,
          errors: errors[emailField],
          touchedFields: touchedFields[emailField],
          placeholder: emailPlaceholder
        })}
        {/* password */}
        {getInfoNode({
          register,
          registerName: passwordField,
          currentLabel: passwordLabel,
          errors: errors[passwordField],
          touchedFields: touchedFields[passwordField],
          placeholder: passwordPlaceholder
        })}
        {/* confirmationPassword */}
        {getInfoNode({
          register,
          registerName: confirmPasswordField,
          currentLabel: confirmationPasswordLabel,
          errors: errors[confirmPasswordField],
          touchedFields: touchedFields[confirmPasswordField],
          placeholder: confirmationPasswordPlaceholder
        })}
        {/* social links block */}
        {getArrayNode({
          register,
          currentLabel: socialLinksLabel,
          currentSubLabel: linksSubLabel,
          placeholder: linkPlaceholder,
          linksFields,
          errors,
          labelDeleteBtn: linkDeleteBtn,
          removeLink,
          labelAddBtn: linkAddBtn,
          appendLink
        })}

        <button type={submitButtonType}
          className={styles.submitBtn}>
          {buttonSubmitTitle}
        </button>
      </form>
    </div>
  );
};
