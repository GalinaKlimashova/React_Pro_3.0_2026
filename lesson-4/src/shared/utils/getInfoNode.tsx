import type {
    FieldsTitles,
    InfoNodeType
} from "../../features/form-native/model/formTypes";
import styles from "../css-files/NativeForm.module.css";

export const getInfoNode = ({
    currentLabel,
    currentField,
    isPending,
    state,
    placeholder,
    currentFieldType,
    setUpdatedState }: InfoNodeType) => {
    const fieldTypedName = currentField as unknown as FieldsTitles;

    return <div key={fieldTypedName}
        className={styles.fieldGroup}>
        <div className={styles.elemSettings}>
            <label htmlFor={fieldTypedName}
                className={styles.label}>
                {currentLabel}
            </label>
        </div>
        <input
            id={fieldTypedName}
            name={fieldTypedName}
            type={currentFieldType}
            disabled={isPending}
            className={`${styles.input} ${state.errors[fieldTypedName] ? styles.inputError : ""}`}
            placeholder={placeholder}
            onChange={(value) => setUpdatedState(value.target.value)}
            defaultValue={state.fields[fieldTypedName]}
        />
        {state.errors[fieldTypedName] && (
            <span className={styles.errorText}>
                {state.errors[fieldTypedName]}
            </span>
        )}
    </div>
};