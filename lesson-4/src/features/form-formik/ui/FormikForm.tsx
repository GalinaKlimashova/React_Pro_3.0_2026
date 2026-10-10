import { Form, Formik } from "formik";
import {
  buttonSubmitTitle,
  submitButtonType,
  confirmationPasswordLabel,
  confirmationPasswordPlaceholder,
  confirmPasswordField,
  emailField, emailLabel,
  emailPlaceholder,
  emailType,
  linkAddBtn,
  linkButtonType,
  linkDeleteBtn,
  linkPlaceholder,
  linksArray,
  linksSubLabel,
  passwordField,
  passwordLabel,
  passwordPlaceholder,
  passwordType,
  socialLinksLabel,
  submitMsg,
  usernameField,
  usernameLabel,
  usernamePlaseholder
} from "@shared/constants";
import styles from "@shared/css-files/GeneralStylesForm.module.css";
import { getArrayNode } from "./getArrayNode";
import { getInfoNode } from "./getInfoNode";
import { dynamicValidationSchema, initialValues } from "../model";

export const FormikForm = () => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={dynamicValidationSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
          console.log(`${submitMsg}`, values);
        }}
      >
        {(formikProps) => {
          return (
            <Form className={styles.formWrapper}>
              {/* username */}
              {getInfoNode({
                currentLabel: usernameLabel,
                currentField: usernameField,
                currentPlaceholder: usernamePlaseholder,
                formikProps
              })}
              {/* email */}
              {getInfoNode({
                currentLabel: emailLabel,
                currentField: emailField,
                currentPlaceholder: emailPlaceholder,
                currentType: emailType,
                formikProps
              })}
              {/* password */}
              {getInfoNode({
                currentLabel: passwordLabel,
                currentField: passwordField,
                currentPlaceholder: passwordPlaceholder,
                currentType: passwordType,
                formikProps
              })}
              {/* confirmationPassword */}
              {getInfoNode({
                currentLabel: confirmationPasswordLabel,
                currentField: confirmPasswordField,
                currentPlaceholder: confirmationPasswordPlaceholder,
                currentType: passwordType,
                formikProps
              })}
              {/* social links block */}
              {getArrayNode({
                arrayNodeName: linksArray,
                label: socialLinksLabel,
                subLabel: linksSubLabel,
                buttonType: linkButtonType,
                removeBtnTitle: linkDeleteBtn,
                addBtnTitle: linkAddBtn,
                fieldsPlaceholder: linkPlaceholder
              })}

              <button type={submitButtonType}
                className={styles.submitBtn}>
                {buttonSubmitTitle}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
