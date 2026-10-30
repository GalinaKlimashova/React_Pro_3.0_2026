import { Box, TextField, Typography } from '@mui/material';
import { useState, useTransition, type ChangeEventHandler, type FC } from 'react';

export const UseTransition: FC = () => {
    const [value, setValue] = useState('');
    const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

    const [isPending, startTransition] = useTransition();

    const changeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const value = e.target.value;
        setValue(value);

        startTransition(() => {
            const newUsers: typeof users = [];
            for (let index = 0; index < 2e4; index++) {
                newUsers.push({
                    id: index,
                    name: value,
                });
            }

            setUsers(newUsers);
        });
    };

    return (
        <>
            <Typography align="center" variant="h3" sx={{ mb: 8 }}>
                useTransition
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <TextField
                    value={value}
                    onChange={changeHandler}
                    placeholder="Prefix"
                    id="outlined-basic"
                    label="Prefix"
                    variant="outlined"
                />
            </Box>
            <Typography align="center" variant="h4" sx={{ mb: 8 }}>
                Users:
            </Typography>
            <Box sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
                {isPending
                    ? 'Loading...'
                    : users.map(({ id, name }) => (
                          <div key={id}>
                              {id}. {name}
                          </div>
                      ))}
            </Box>
        </>
    );
};
