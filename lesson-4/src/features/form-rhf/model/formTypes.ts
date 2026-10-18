import type {
    FieldError,
    FieldErrors,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    UseFormRegister
} from "react-hook-form";

type RegisterName = "username"
    | "contactEmail"
    | "passwordField"
    | "confirmPassword"
    | "linksArray"
    | `linksArray.${number}`
    | `linksArray.${number}.link`;

type RegisterRnfProps = {
    username: string;
    contactEmail: string;
    passwordField: string;
    confirmPassword: string;
    linksArray: {
        link: string;
    }[]
};

type LinksFields = ({
    id: string;
    link: string;
} & Record<"id", string> & {
    disabled?: boolean;
})[];

export type RhfInfoNodeType = {
    register: UseFormRegister<RegisterRnfProps>,
    registerName: RegisterName,
    currentLabel: string,
    errors: FieldError | undefined,
    touchedFields: boolean | undefined,
    placeholder: string
};

export type RhfArrayNodeTypeType = {
    register: UseFormRegister<RegisterRnfProps>,
    currentLabel: string,
    currentSubLabel: string,
    placeholder: string,
    linksFields: LinksFields,
    errors: FieldErrors<RegisterRnfProps>,
    labelDeleteBtn: string,
    removeLink: UseFieldArrayRemove,
    labelAddBtn: string,
    appendLink: UseFieldArrayAppend<RegisterRnfProps>
};
