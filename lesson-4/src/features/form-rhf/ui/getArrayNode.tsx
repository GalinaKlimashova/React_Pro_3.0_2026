import { inputTextType, linkButtonType, linksArray } from "@shared/constants";
import styles from "@shared/css-files/GeneralStylesForm.module.css";
import type { RhfArrayNodeTypeType } from "../model";

export const getArrayNode = ({
    register,
    currentLabel,
    currentSubLabel,
    placeholder,
    linksFields,
    errors,
    labelDeleteBtn,
    removeLink,
    labelAddBtn,
    appendLink
}: RhfArrayNodeTypeType) => {
    return <div className={styles.arrayContainer}>

        <div className={styles.arrayLabel}>
            <label className={styles.label}>
                {currentLabel}
            </label>
        </div>

        <div className={styles.arrayLabel}>
            <p className={styles.arrayExplanation}>
                {currentSubLabel}
            </p>
        </div>

        {linksFields.map((field, index) => {
            return (
                <div
                    key={index + "" + field.id}
                    className={styles.linkRow}>
                    <div className={styles.inputWithError}>
                        <div className={styles.arrayRow}>
                            <input
                                {...register(`${linksArray}.${index}.link`)}
                                className={`${styles.input} ${styles.linkInput} ${errors.linksArray?.[index]?.link ? styles.inputError : ""}`}
                                placeholder={placeholder}
                                type={inputTextType}
                            />
                        </div>

                        {errors.linksArray?.[index]?.link && (
                            <div className={styles.errorText}>
                                {errors.linksArray[index]?.link?.message}
                            </div>
                        )}

                    </div>
                    <button
                        type={linkButtonType}
                        className={styles.removeBtn}
                        onClick={() => removeLink(index)}
                    >{labelDeleteBtn} </button>
                </div>
            )
        })}

        <button
            type={linkButtonType}
            className={styles.addBtn}
            onClick={() => appendLink({ link: "" })}
        >
            {labelAddBtn}
        </button>
    </div>
};
