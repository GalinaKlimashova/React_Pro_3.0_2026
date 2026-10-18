import {
    ErrorMessage,
    Field
} from "formik";
import styles from "@shared/css-files/GeneralStylesForm.module.css";
import type { FieldsTitles, InfoNodeType } from "../model";

export const getInfoNode = ({
    currentLabel,
    currentField,
    currentPlaceholder,
    currentType,
    formikProps }: InfoNodeType) => {

    const resultStyle = formikProps?.touched[currentField as FieldsTitles]
        && formikProps.errors[currentField as FieldsTitles]
        ? `${styles.input} ${styles.inputError}`
        : `${styles.input}`;

    return <div className={styles.fieldGroup}>
        <label className={styles.label}>
            {currentLabel}
        </label>
        <Field
            name={currentField}
            type={currentType}
            className={resultStyle}
            placeholder={currentPlaceholder}
        />
        <ErrorMessage
            name={currentField}
            component="div"
            className={styles.errorText}
        />
    </div>
};
