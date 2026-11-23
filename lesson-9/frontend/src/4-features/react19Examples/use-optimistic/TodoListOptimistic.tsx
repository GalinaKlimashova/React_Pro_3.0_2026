import { Box, Button, TextField, Typography } from '@mui/material';
import { useOptimistic, useState, useTransition, type ChangeEventHandler, type FC } from 'react';
import { wait } from '../../../6-shared/lib/wait';
import {
    BTN_ADD,
    DEMO_USER_FIRST_NAME,
    DEMO_USER_SECOND_NAME,
    HEADING_OPTIMISTIC_USERS,
    INPUT_NAME_LABEL,
    INPUT_NAME_PLACEHOLDER,
} from '6-shared/config/constants';

type User = { id: number; name: string };

type OptimisticUser = User & {
    isOptimistic?: boolean;
};

export const TodoListOptimistic: FC = () => {
    const [value, setValue] = useState('');
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            name: DEMO_USER_FIRST_NAME,
        },
        {
            id: 2,
            name: DEMO_USER_SECOND_NAME,
        },
    ]);

    const [isPending, startTransition] = useTransition();

    const [optimisticUsers, setOptimisticUser] = useOptimistic<OptimisticUser[], OptimisticUser>(
        users,
        (state, newOptimisticUser) => [...state, newOptimisticUser],
    );

    const changeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setValue(e.target.value);
    };

    const clickHandler = () => {
        const newUser: User = {
            id: Date.now(),
            name: value,
        };

        // Оптимистичное обновление — синхронно ДО startTransition
        setOptimisticUser({ ...newUser, isOptimistic: true });

        startTransition(async () => {
            await wait(2e3);

            startTransition(() => {
                setUsers((prev) => [...prev, newUser]);
                setValue('');
            });
        });
    };

    return (
        <>
            <Typography align="center" variant="h3" sx={{ mb: 2 }}>
                useOptimistic
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <TextField
                    sx={{ mx: 1 }}
                    value={value}
                    onChange={changeHandler}
                    placeholder={INPUT_NAME_PLACEHOLDER}
                    id="outlined-basic"
                    label={INPUT_NAME_LABEL}
                    variant="outlined"
                />

                <Button loading={isPending} onClick={clickHandler} variant="contained">
                    {BTN_ADD}
                </Button>
            </Box>
            <Typography align="center" variant="h4" sx={{ mb: 2 }}>
                {HEADING_OPTIMISTIC_USERS}
            </Typography>
            <Box sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
                {optimisticUsers.map(({ id, name, isOptimistic }, index) => (
                    <Box key={id} sx={{ opacity: isOptimistic ? 0.5 : 1 }}>
                        {index + 1}. {name}
                    </Box>
                ))}
            </Box>
        </>
    );
};
