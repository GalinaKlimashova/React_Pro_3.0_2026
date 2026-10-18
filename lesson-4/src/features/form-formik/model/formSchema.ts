import { v4 as uuidv4 } from 'uuid';
import * as Yup from "yup";
import {
    confirmPasswordErrorMsg,
    emailErrorMsg,
    linkUrlErrorMsg,

    passwordErrorMsg,
    passwordField,
    passwordMinLength,
    requiredMessage,
    usernameErrorMsg,
    userNameMinLength
} from "../../../shared/constants";


export const dynamicValidationSchema = Yup.object({
    username: Yup.string()
        .min(userNameMinLength, usernameErrorMsg)
        .required(requiredMessage),

    contactEmail: Yup.string()
        .email(emailErrorMsg)
        .required(requiredMessage),

    passwordField: Yup.string()
        .min(passwordMinLength, passwordErrorMsg)
        .required(requiredMessage),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref(passwordField), ""],
            confirmPasswordErrorMsg)
        .required(requiredMessage),

    linksArray: Yup.array()
        .of(
            Yup.object().shape({
                link: Yup.string()
                    .url(linkUrlErrorMsg)
                    .required(requiredMessage)
            }))
    // don’t want to do
    //.min(1, linkArrayMinLengthMsg),
});

export const initialValues = {
    username: "",
    contactEmail: "",
    passwordField: "",
    confirmPassword: "",
    linksArray: [
        {
            id: uuidv4(),
            link: ""
        }
    ]
};
