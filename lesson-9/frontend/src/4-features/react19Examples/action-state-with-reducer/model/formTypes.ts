import {
    ACTION_RESET,
    ACTION_SUBMIT_FAILURE,
    ACTION_SUBMIT_START,
    ACTION_SUBMIT_SUCCESS,
} from '6-shared/config/constants';

export type FormState = {
    dirty: boolean;
    submitting: boolean;
    success: boolean;
    error: string | null;
    data: { name: string; surname: string; patronymic?: string; nickname: string } | null;
};

export type FormAction =
    | { type: typeof ACTION_SUBMIT_START }
    | {
          type: typeof ACTION_SUBMIT_SUCCESS;
          data: { name: string; surname: string; patronymic?: string; nickname: string };
      }
    | { type: typeof ACTION_SUBMIT_FAILURE; error: string }
    | { type: typeof ACTION_RESET };

export const initialFormState: FormState = {
    dirty: false,
    submitting: false,
    success: false,
    error: null,
    data: null,
};
