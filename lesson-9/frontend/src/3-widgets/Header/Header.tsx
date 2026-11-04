import { useAuth } from '4-features/authRouting/2-useAuth';
import { HEADER_SHELTER_TITLE } from '6-shared/config/constants';
import { AppBar, Box, Button, Link as MuiLink, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import type { FC, MouseEvent } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router';
import { AUTHORIZED_LINKS, UNAUTHORIZED_LINKS } from './config';
import styles from './Header.module.css';

export const Header: FC = () => {
    const { isAuthenticated } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const links = isAuthenticated ? AUTHORIZED_LINKS : UNAUTHORIZED_LINKS;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    sx={{
                        ml: 'auto',
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={handleClick}
                        sx={{
                            color: 'rgb(21, 57, 98)',
                            borderColor: 'rgb(21, 57, 98)',
                            '&:hover': {
                                backgroundColor: 'rgba(21, 57, 98, 0.08)',
                            },
                        }}
                    >
                        Страницы
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        sx={{
                            '& .MuiPaper-root': {
                                marginTop: '4px',
                            },
                        }}
                    >
                        {links.map((link) => {
                            if (!link.href) return null;
                            return (
                                <MenuItem key={link.href} onClick={handleClose}>
                                    <NavLink to={link.href} style={{ textDecoration: 'none', width: '100%' }}>
                                        {({ isActive }) => (
                                            <MuiLink
                                                component="span"
                                                sx={{
                                                    display: 'block',
                                                    color: isActive ? 'rgb(21, 57, 98)' : 'inherit',
                                                    fontWeight: isActive ? 'bold' : 'normal',
                                                    textDecoration: 'none',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(21, 57, 98, 0.08)',
                                                        color: 'primary.dark',
                                                    },
                                                }}
                                            >
                                                {link.title}
                                            </MuiLink>
                                        )}
                                    </NavLink>
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
