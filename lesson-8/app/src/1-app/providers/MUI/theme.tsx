import { createTheme, useTheme } from '@mui/material';
import type { LinkProps } from '@mui/material/Link';
import { forwardRef } from 'react';
import { NavLink as NavRouterLink } from 'react-router';
import type { NavLinkProps as NavRouterLinkProps } from 'react-router';

// Смотри доку https://mui.com/material-ui/guides/routing/

const LinkBehavior = forwardRef<HTMLAnchorElement, Omit<NavRouterLinkProps, 'to'> & { href: NavRouterLinkProps['to'] }>(
    (props, ref) => {
        const { href, style, ...other } = props;
        const muiTheme = useTheme();

        return (
            <NavRouterLink
                style={({ isActive }) => {
                    return {
                        ...style,
                        color: isActive ? muiTheme.palette.warning.main : muiTheme.palette.primary.main,
                    };
                }}
                // Prop end нужен для более точного определения активной ссылки
                // Читай доку https://reactrouter.com/en/main/components/nav-link#end
                end
                ref={ref}
                to={href}
                {...other}
            />
        );
    },
);

LinkBehavior.displayName = 'LinkBehavior';

export const createMuiTheme = (mode: 'light' | 'dark') =>
    createTheme({
        palette: {
            mode,
            background: {
                default: mode === 'dark' ? '#121212' : '#ffffff',
                paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
            },
        },
        components: {
            MuiLink: {
                defaultProps: {
                    component: LinkBehavior,
                    underline: 'none',
                } as Omit<LinkProps, 'className'>,
            },
            MuiButtonBase: {
                defaultProps: {
                    LinkComponent: LinkBehavior,
                },
            },
        },
    });
