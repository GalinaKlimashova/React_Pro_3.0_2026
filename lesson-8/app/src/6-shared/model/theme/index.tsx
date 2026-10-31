import { useCallback, createContext, useContext, useMemo, useState, type FC, type ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
    portalBg: string;
    portalText: string;
    portalShadow: string;
    dialogBg: string;
    dialogText: string;
    dialogHeading: string;
    buttonCancelBg: string;
    buttonCancelText: string;
    buttonConfirmBg: string;
    buttonConfirmText: string;
    backdrop: string;
}

export const themeColors: Record<ThemeMode, ThemeColors> = {
    light: {
        portalBg: '#323232',
        portalText: '#fff',
        portalShadow: '0 2px 8px rgba(0,0,0,0.2)',
        dialogBg: '#fff',
        dialogText: '#666',
        dialogHeading: '#333',
        buttonCancelBg: '#e0e0e0',
        buttonCancelText: '#333',
        buttonConfirmBg: '#d32f2f',
        buttonConfirmText: '#fff',
        backdrop: 'rgba(0,0,0,0.5)',
    },
    dark: {
        portalBg: '#4a4a4a',
        portalText: '#e0e0e0',
        portalShadow: '0 2px 8px rgba(0,0,0,0.5)',
        dialogBg: '#2d2d2d',
        dialogText: '#b0b0b0',
        dialogHeading: '#e0e0e0',
        buttonCancelBg: '#555',
        buttonCancelText: '#e0e0e0',
        buttonConfirmBg: '#ef5350',
        buttonConfirmText: '#fff',
        backdrop: 'rgba(0,0,0,0.7)',
    },
};

export interface ThemeContextType {
    mode: ThemeMode;
    colors: ThemeColors;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    colors: themeColors.light,
    toggleTheme: () => {},
});

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        try {
            return (localStorage.getItem('theme') as ThemeMode) || 'light';
        } catch {
            return 'light';
        }
    });

    const toggleTheme = useCallback(() => {
        setMode((prev) => {
            const next = prev === 'light' ? 'dark' : 'light';
            try {
                localStorage.setItem('theme', next);
            } catch {}
            // Сообщаем всем подписчикам о смене темы
            window.dispatchEvent(new Event('theme-change'));
            return next;
        });
    }, []);

    const value = useMemo(
        () => ({
            mode,
            colors: themeColors[mode],
            toggleTheme,
        }),
        [mode, toggleTheme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
