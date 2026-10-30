import { useAuth } from '4-features/ authRouting/2-useAuth';
import { HEADER_SHELTER_TITLE } from '6-shared/config/constants';
import { AppBar, Box, Link as MuiLink, Toolbar, Typography } from '@mui/material';
import type { FC } from 'react';
import { NavLink } from 'react-router';
import { AUTHORIZED_LINKS, UNAUTHORIZED_LINKS } from './config';
import styles from './Header.module.css';

export const Header: FC = () => {
    const { isAuthenticated } = useAuth();

    const links = isAuthenticated ? AUTHORIZED_LINKS : UNAUTHORIZED_LINKS;

    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{
                border: () => `3px solid rgb(21, 57, 98)`,
                background: () => `lightsteelblue`,
            }}
        >
            <Toolbar>
                <Typography variant="h6" component="h6" className={styles.headerStyles}>
                    {HEADER_SHELTER_TITLE}
                </Typography>

                <Box
                    component="nav"
                    sx={{
                        ml: 'auto',
                    }}
                >
                    {links.map((link) => {
                        if (!link.href) return null;
                        return (
                            <NavLink
                                key={link.href}
                                to={link.href}
                                style={{ textDecoration: 'none' }} // Отключаем стандартное подчеркивание ссылки браузера
                            >
                                {({ isActive }) => (
                                    <MuiLink
                                        component={'span'}
                                        sx={{
                                            color: isActive ? 'rgb(21, 57, 98)' : 'white', // Переключаем цвет по флагу
                                            fontWeight: isActive ? 'bold' : 'normal',
                                            textDecoration: 'none',
                                            paddingLeft: '1rem',
                                            transition: 'all 0.2s ease', // Плавный переход при смене роута
                                            '&:hover': {
                                                color: 'primary.dark',
                                            },
                                        }}
                                    >
                                        {link.title}
                                    </MuiLink>
                                )}
                            </NavLink>
                        );
                    })}
                </Box>
            </Toolbar>
        </AppBar>
    );
};
