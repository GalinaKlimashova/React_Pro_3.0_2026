import { congratulationMsg, successMsg } from "@shared/constants";
import type {
    FormFieldsType
} from "../../features/form-native/model/formTypes";
import styles from "../css-files/NativeForm.module.css";
import successScreen from "../../assets/successScreen.png";

export const getCongratulation = ({ username, contactEmail }: FormFieldsType) => {
    const successStr =
        <><strong>{username}</strong>, {successMsg} <strong>{contactEmail}</strong></>;
    return (
        <div className={styles.card}>
            <img src={successScreen} className={styles.successScreenImg} />
            <p><strong>{congratulationMsg}</strong></p>
            <p>{successStr}</p>
        </div>
    );
}