import { Box, Button, Switch, Typography } from '@mui/material';
import type { FC } from 'react';
import { useTheme } from '6-shared/model/theme';
import { useConfirmDialog } from '6-shared/ui/ConfirmDialog';
import { Tooltip } from '6-shared/ui/Tooltip';

export const PortalShowcase: FC = () => {
    const { showConfirm } = useConfirmDialog();
    const { mode, toggleTheme } = useTheme();

    const handleDelete = async () => {
        const confirmed = await showConfirm({
            title: 'Удалить элемент?',
            description: 'Это действие необратимо.',
        });

        if (confirmed) {
            // eslint-disable-next-line no-console
            console.log('Удалено успешно!');
            alert('Удалено успешно!');
        }
    };

    return (
        <Box sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h3" sx={{ mb: 0 }}>
                    Portal Showcase
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">{mode === 'light' ? 'Это светлая тема' : 'Это тёмная тема'}</Typography>
                    <Switch checked={mode === 'dark'} onChange={toggleTheme} />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Box>
                    <Tooltip content="Это подсказка сверху" position="top">
                        <Button variant="contained">Подсказка сверху</Button>
                    </Tooltip>
                </Box>
                <Box>
                    <Tooltip content="Подсказка снизу" position="bottom">
                        <Button variant="outlined">Подсказка снизу</Button>
                    </Tooltip>
                </Box>
                <Box>
                    <Tooltip content="Подсказка справа" position="right">
                        <Button variant="outlined">Подсказка справа</Button>
                    </Tooltip>
                </Box>
                <Box>
                    <Tooltip content="Подсказка слева" position="left">
                        <Button variant="outlined">Подсказка слева</Button>
                    </Tooltip>
                </Box>

                <Button variant="contained" color="error" onClick={handleDelete}>
                    Удалить
                </Button>
            </Box>
        </Box>
    );
};
