import { Box, Button, TextField, Typography } from '@mui/material';
import { useOptimistic, useState, useTransition, type ChangeEventHandler, type FC } from 'react';
import { wait } from '6-shared/lib/wait';

type User = { id: number; name: string };

type OptimisticUser = User & {
    isOptimistic?: boolean;
};

export const UseOptimistic: FC = () => {
    const [value, setValue] = useState('');
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            name: 'First',
        },
        {
            id: 2,
            name: 'Second',
        },
    ]);

    const [isPending, startTransition] = useTransition();

    const [optimisticUsers, setOptimisticUser] = useOptimistic<OptimisticUser[], OptimisticUser>(
        users,
        (state, newOptimisticUser) => [...state, newOptimisticUser],
    );

    console.log({ users, optimisticUsers });

    const changeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setValue(e.target.value);
    };

    const clickHandler = () => {
        const newUser: User = {
            id: Date.now(),
            name: value,
        };

        startTransition(async () => {
            try {
                setOptimisticUser({ ...newUser, isOptimistic: true });

                await wait(2e3);

                startTransition(() => {
                    setUsers((prev) => {
                        return [...prev, newUser];
                    });

                    setValue('');
                });
            } catch (error) {
                console.log(error);
            }
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
                    placeholder="Prefix"
                    id="outlined-basic"
                    label="Prefix"
                    variant="outlined"
                />

                <Button loading={isPending} onClick={clickHandler} variant="contained">
                    Add
                </Button>
            </Box>
            <Typography align="center" variant="h4" sx={{ mb: 2 }}>
                Users:
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
