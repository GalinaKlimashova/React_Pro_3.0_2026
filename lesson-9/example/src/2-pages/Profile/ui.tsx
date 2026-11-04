import { Box, Typography } from '@mui/material';
import type { FC } from 'react';
import { useContextAuthStrategy } from '6-shared/lib/useContextAuthStrategy';
import { ProtectionWrapper } from '6-shared/ui/ProtectionWrapper';

export const Profile: FC = () => {
    return (
        <Box>
            <Typography variant="h2" align="center">
                Profile page
            </Typography>
        </Box>
    );
};

export const ProtectedProfile = () => {
    return (
        <ProtectionWrapper useAuthStrategy={useContextAuthStrategy}>
            <Profile />
        </ProtectionWrapper>
    );
};
