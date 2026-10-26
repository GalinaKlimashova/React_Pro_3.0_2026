import { Box, Button, Typography } from '@mui/material';
import { toastObserver } from '@zh2s/my-toast';
import type { FC } from 'react';
import { toast } from 'react-toastify';

interface Toast {
    text: string;
    type: 'success' | 'error';
}

const TOASTIFY_TOASTS: Toast[] = [
    {
        text: '111',
        type: 'success',
    },
    {
        text: '000',
        type: 'error',
    },
];

export const Main: FC = () => {
    const reactToastifyHandler = ({ text, type }: Toast) => {
        toast[type](text);
    };

    const myToastHandler = ({ text, type }: Toast) => {
        toastObserver.notify({
            title: text,
            type,
        });
    };

    return (
        <>
            <Typography variant="h3" sx={{ mb: 4 }} textAlign={'center'}>
                Main page
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                {TOASTIFY_TOASTS.map((toast, index) => (
                    <Button
                        key={index}
                        variant="contained"
                        color={toast.type}
                        onClick={() => reactToastifyHandler(toast)}
                    >
                        Open {toast.type.charAt(0).toUpperCase() + toast.type.slice(1)} Toast
                    </Button>
                ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                {TOASTIFY_TOASTS.map((toast, index) => (
                    <Button key={index} variant="contained" color={toast.type} onClick={() => myToastHandler(toast)}>
                        Open My {toast.type.charAt(0).toUpperCase() + toast.type.slice(1)} Toast
                    </Button>
                ))}
            </Box>
        </>
    );
};
