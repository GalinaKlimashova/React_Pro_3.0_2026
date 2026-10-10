import {
    type InfoNodeType,
    type MiddlewareStepType
} from "../../features/form-native/model";
import { getInfoNode } from "./getInfoNode";

export const getMiddlewareStep = ({ stepContent }: MiddlewareStepType) => {
    return (<div>
        {stepContent.map((currentElem: InfoNodeType) => {
            const { currentLabel,
                currentField,
                isPending,
                state,
                placeholder,
                currentFieldType,
                setUpdatedState,
            } = currentElem;

            return getInfoNode({
                currentLabel: currentLabel,
                currentField: currentField,
                isPending: isPending,
                state,
                placeholder: placeholder,
                currentFieldType: currentFieldType,
                setUpdatedState: setUpdatedState,
            })
        })}
    </div>)
}