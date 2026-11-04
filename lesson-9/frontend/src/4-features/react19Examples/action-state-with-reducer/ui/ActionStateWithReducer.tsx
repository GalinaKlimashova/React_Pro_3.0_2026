import { BTN_SAVE, BTN_SAVING, HEADING_ACTION_STATE_REDUCER } from '6-shared/config/constants';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useActionState } from 'react';

import { initialFormState } from '../model';
import { submitFormAction } from '../model/formActions';

export const ActionStateWithReducer = () => {
    const [state, formAction, isPending] = useActionState(submitFormAction, initialFormState);

    return (
        <>
            <Typography align="center" variant="h3" sx={{ mb: 2 }}>
                {HEADING_ACTION_STATE_REDUCER}
            </Typography>

            <Box
                component="form"
                action={formAction}
                sx={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 3 }}
            >
                <TextField required name="name" label="Имя" defaultValue="" fullWidth />
                <TextField required name="surname" label="Фамилия" defaultValue="" fullWidth />
                <TextField required name="nickname" label="Ник" defaultValue="" fullWidth />

                <FormControlLabel control={<Checkbox name="skipPatronymic" />} label="Без отчества" />

                <TextField name="patronymicValue" label="Отчество" defaultValue="" fullWidth />

                <Button type="submit" variant="contained" loading={isPending} disabled={isPending}>
                    {state?.submitting ? BTN_SAVING : BTN_SAVE}
                </Button>

                {state?.success && (
                    <Typography color="success.main" align="center">
                        Данные успешно сохранены!
                    </Typography>
                )}
                {state?.error && (
                    <Typography color="error.main" align="center">
                        {state?.error}
                    </Typography>
                )}
            </Box>
        </>
    );
};
