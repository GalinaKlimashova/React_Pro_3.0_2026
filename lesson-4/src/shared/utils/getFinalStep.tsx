import {
    confirmStepTitle,
    confirmStr,
    emailField,
    hiddenType,
    usernameField
} from "@shared/constants";
import type { ReactNode } from "react";
import type {
    FormFieldsType
} from "../../features/form-native/model/formTypes";
import styles from "../css-files/NativeForm.module.css";

export const getFinalStep = ({
    username,
    contactEmail }: FormFieldsType): ReactNode => {

    const screenMsg =
        <><strong>{username}</strong>, {confirmStr} <strong>{contactEmail}</strong>?</>;

    return <div className={styles.msgContainer}>
        <p><strong>{confirmStepTitle}</strong></p>
        <p>{screenMsg}</p>

        {/* Скрытый инпут, 
        чтобы данные долетели в formData 
        при финальном сабмите */}
        <input
            type={hiddenType}
            name={usernameField}
            value={username} />
        <input
            type={hiddenType}
            name={emailField}
            value={contactEmail} />
    </div>
};