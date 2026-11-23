import {
    emailField,
    emailLabel,
    emailPlaceholder,
    submitButtonType,
    usernameField,
    usernameLabel,
    usernamePlaseholder,
} from '6-shared/constants';
import { emailType, inputTextType } from '6-shared/config/constants';
import styles from '6-shared/css-files/NativeForm.module.css';
import { getMiddlewareStep } from '6-shared/utils/getMiddlwareStep';
import { Container, Typography } from '@mui/material';
import { useActionState } from 'react';
import { initialFormState, submitFormAction } from '../model';

export const FormWithAsyncSave = () => {
    const [state, formAction, isPending] = useActionState(submitFormAction, initialFormState);

    const stepContent = [
        {
            currentLabel: usernameLabel,
            currentField: usernameField,
            isPending,
            state,
            placeholder: usernamePlaseholder,
            currentFieldType: inputTextType,
        },
        {
            currentLabel: emailLabel,
            currentField: emailField,
            isPending,
            state,
            placeholder: emailPlaceholder,
            currentFieldType: emailType,
        },
    ];

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography align="center" variant="h3" sx={{ mb: 2 }}>
                useActionState.reducer
            </Typography>
            <div className={styles.container}>
                <form action={formAction} className={styles.form}>
                    {stepContent && getMiddlewareStep({ stepContent })}
                    <button
                        type={submitButtonType}
                        disabled={isPending}
                        className={`${styles.submitBtn} ${styles.nextBtn}`}
                    >
                        {isPending ? 'Saving…' : state?.success ? 'Saved!' : 'Сохранить'}
                    </button>
                </form>
            </div>
        </Container>
    );
};
