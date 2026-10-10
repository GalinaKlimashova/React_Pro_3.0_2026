import { inputTextType } from "@shared/constants";
import styles from "@shared/css-files/GeneralStylesForm.module.css";
import {
    ErrorMessage,
    Field,
    FieldArray,
    getIn,
    type FormikProps
} from "formik";
import { v4 as uuidv4 } from 'uuid';
import type { ArrayNodeType, ArrayValue } from "../model";


export const getArrayNode = ({
    arrayNodeName,
    label,
    subLabel,
    buttonType,
    removeBtnTitle,
    addBtnTitle,
    fieldsPlaceholder
}: ArrayNodeType) => {

    const getInfo = (index: number, form: FormikProps<unknown>): string => {
        const fieldName = `${arrayNodeName}.${index}.link`;

        const isTagTouched = getIn(form.touched, fieldName);
        const tagError = getIn(form.errors, fieldName);

        return isTagTouched && tagError
            ? `${styles.input} ${styles.linkInput} ${styles.inputError}`
            : `${styles.input} ${styles.linkInput}`;
    };

    return <FieldArray name={arrayNodeName}>
        {({ push, remove, form }) => (
            <div className={styles.arrayContainer}>
                <div className={styles.arrayLabel}>
                    <label className={styles.label}>
                        {label}
                    </label>
                </div>

                <div className={styles.arrayLabel}>
                    <p className={styles.arrayExplanation}>
                        {subLabel}
                    </p>
                </div>
                {form.values[arrayNodeName].map((currentValue: ArrayValue, index: number) => {
                    return (
                        <div
                            key={index + "" + currentValue.id}
                            className={styles.linkRow}>
                            <div className={styles.inputWithError}>
                                <div className={styles.arrayRow}>
                                    <Field
                                        key={currentValue.id}
                                        name={`${arrayNodeName}.${index}.link`}
                                        className={getInfo(index, form)}
                                        placeholder={fieldsPlaceholder}
                                        type={inputTextType}
                                    />
                                </div>
                                <ErrorMessage
                                    name={`${arrayNodeName}.${index}.link`}
                                    component="div"
                                    className={styles.errorText} />
                            </div>
                            <button
                                type={buttonType}
                                className={styles.removeBtn}
                                onClick={() => remove(index)}>
                                {removeBtnTitle}
                            </button>
                        </div>
                    )
                })}

                <button
                    type={buttonType}
                    className={styles.addBtn}
                    onClick={() => push({ id: uuidv4(), link: "" })}
                >
                    {addBtnTitle}
                </button>
            </div>
        )}
    </FieldArray>;
};
