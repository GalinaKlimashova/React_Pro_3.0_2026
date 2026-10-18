import type { FormikProps } from "formik";

export type ArrayValue = {
    id: string;
    link: string;
};

export type CurrentProps = {
    username: string;
    contactEmail: string;
    passwordField: string;
    confirmPassword: string;
    linksArray: { id: string; link: string; }[];
}

export type FieldsTitles = "username"
    | "contactEmail"
    | "passwordField"
    | "confirmPassword";

export type InfoNodeType = {
    currentLabel: string,
    currentField: string,
    currentPlaceholder: string,
    currentType?: string
    formikProps?: FormikProps<CurrentProps>
};

export type ArrayNodeType = {
    arrayNodeName: string;
    label: string;
    subLabel: string;
    buttonType: "submit" | "reset" | "button" | undefined;
    removeBtnTitle: string;
    addBtnTitle: string;
    fieldsPlaceholder: string;
};
