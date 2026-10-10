import styles from "@shared/css-files/GeneralStylesForm.module.css";
import type { RhfInfoNodeType } from "../model";

export const getInfoNode = ({
    register,
    registerName,
    currentLabel,
    errors,
    touchedFields,
    placeholder }: RhfInfoNodeType) => {
    return <div className={styles.fieldGroup}>
        <label className={styles.label}>
            {currentLabel}
        </label>
        <input
            {...register(registerName)}
            // touchedFields мешает красить красным input borders,
            // если пользователь просто нажал submit
            // без заполнения полей.
            // Тут, конечно, зависит от требоаний бизнеса
            className={`${styles.input} ${touchedFields && errors ? styles.inputError : ""}`}
            // className={`${styles.input} ${errors ? styles.inputError : ""}`}
            placeholder={placeholder}
        />
        {errors && (
            <div className={styles.errorText}>
                {errors.message}
            </div>
        )}
    </div>
};
