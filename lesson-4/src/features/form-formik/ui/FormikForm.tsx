import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import styles from "./FormikForm.module.css";
import { RenderCounter } from "@shared/ui";

const dynamicValidationSchema = Yup.object({
  groupName: Yup.string()
    .min(3, "Название должно быть не менее 3 символов")
    .required("Обязательное поле"),
  contactEmail: Yup.string()
    .email("Некорректный формат email")
    .required("Обязательное поле"),
});

const initialValues = {
  groupName: "",
  contactEmail: "",
};

export const FormikForm = () => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={dynamicValidationSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(formikProps) => {
          return (
            <Form className={styles.formWrapper}>
              {/* <RenderCounter name="Formik" /> */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Название группы пассажиров
                </label>
                <Field
                  name="groupName"
                  className={`${styles.input} ${formikProps.touched.groupName && formikProps.errors.groupName ? styles.inputError : ""}`}
                  placeholder="Например: Сборная по футболу"
                />
                <ErrorMessage
                  name="groupName"
                  component="div"
                  className={styles.errorText}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Контактный Email руководителя
                </label>
                <Field
                  name="contactEmail"
                  type="email"
                  className={`${styles.input} ${formikProps.touched.contactEmail && formikProps.errors.contactEmail ? styles.inputError : ""}`}
                  placeholder="manager@example.com"
                />
                <ErrorMessage
                  name="contactEmail"
                  component="div"
                  className={styles.errorText}
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                Забронировать
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
