import {
    type InfoNodeType,
    type MiddlewareStepType,
} from '../../4-features/react19Examples/form-with-async-save/model';
import { getInfoNode } from './getInfoNode';

export const getMiddlewareStep = ({ stepContent }: MiddlewareStepType) => {
    return (
        <div>
            {stepContent?.map((currentElem: InfoNodeType) => {
                const { currentLabel, currentField, isPending, state, placeholder, currentFieldType } = currentElem;

                return getInfoNode({
                    currentLabel: currentLabel,
                    currentField: currentField,
                    isPending: isPending,
                    state,
                    placeholder: placeholder,
                    currentFieldType: currentFieldType,
                });
            })}
        </div>
    );
};
