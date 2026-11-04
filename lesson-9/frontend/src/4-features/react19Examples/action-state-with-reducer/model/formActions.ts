import {
    ACTION_RESET,
    ACTION_SUBMIT_FAILURE,
    ACTION_SUBMIT_START,
    ACTION_SUBMIT_SUCCESS,
} from '6-shared/config/constants';
import type { FormAction, FormState } from './formTypes';
import { initialFormState } from './formTypes';

export function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case ACTION_SUBMIT_START:
            return { ...state, submitting: true, error: null };
        case ACTION_SUBMIT_SUCCESS:
            return { ...state, data: action.data, submitting: false, success: true, error: null };
        case ACTION_SUBMIT_FAILURE:
            return { ...state, submitting: false, error: action.error, success: false };
        case ACTION_RESET:
            return initialFormState;
        default:
            return state;
    }
}

type ActionOrFormData = FormAction | FormData;

// Submit function that uses reducer internally for dirty/submitting/success state management
export async function submitFormAction(
    prevState: FormState | null,
    payload: ActionOrFormData,
): Promise<FormState | null> {
    const activeState = prevState ?? initialFormState;

    if ('type' in payload) {
        return formReducer(activeState, payload as FormAction);
    }

    const formData = payload;
    const data = {
        name: formData.get('name') as string,
        surname: formData.get('surname') as string,
        nickname: formData.get('nickname') as string,
        ...(formData.get('patronymic') === 'on' && {
            patronymic: formData.get('patronymicValue') as string,
        }),
    };

    const state = formReducer(activeState, { type: ACTION_SUBMIT_START });

    try {
        await new Promise((res) => setTimeout(res, 1000));
        if (data.name.length < 1) throw new Error('Имя слишком короткое');
        // Returning initialState triggers React 19 auto-reset of form fields,
        // while preserving the success data for brief display
        return { ...initialFormState, data };
    } catch (err) {
        return formReducer(state, {
            type: ACTION_SUBMIT_FAILURE,
            error: err instanceof Error ? err.message : 'Ошибка',
        });
    }
}
