import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import type { FC } from 'react';
import { useAuthContext } from '6-shared/lib/authContext';
import { AUTHORIZED_LINKS, UNAUTHORIZED_LINKS } from './config';

export const Header: FC = () => {
    const { accessToken } = useAuthContext();

    const links = accessToken ? AUTHORIZED_LINKS : UNAUTHORIZED_LINKS;

    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar>
                <Link href={'/'} variant="button">
                    <Typography variant="h6" component="h6">
                        Home
                    </Typography>
                </Link>

                <Box component="nav" sx={{ ml: 'auto' }}>
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} sx={{ mx: 1 }}>
                            {link.title}
                        </Link>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
};
