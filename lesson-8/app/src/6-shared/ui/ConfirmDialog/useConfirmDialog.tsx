import React, { type FC, type ReactNode } from 'react';
import { useCallback, useContext, useRef, useState, createContext } from 'react';

import { createPortal } from 'react-dom';

import { useTheme } from '6-shared/model/theme';

export interface ConfirmDialogOptions {
    title: string;
    description?: string;
}

export interface ConfirmDialogState {
    title: string;
    description: string;
    resolve: ((value: boolean) => void) | null;
}

export interface UseConfirmDialogResult {
    showConfirm: (options: ConfirmDialogOptions) => Promise<boolean>;
}

export const ConfirmDialogContext = createContext<UseConfirmDialogResult>({
    showConfirm: () => Promise.resolve(false),
});

export const ConfirmDialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<ConfirmDialogState | null>(null);
    const pendingRef = useRef<{ resolve: (value: boolean) => void } | null>(null);

    const showConfirm = useCallback((options: ConfirmDialogOptions): Promise<boolean> => {
        return new Promise<boolean>((resolve) => {
            pendingRef.current = { resolve };
            setState({
                title: options.title,
                description: options.description ?? '',
                resolve: null, // будет установлен диалогом после монтирования
            });
        });
    }, []);

    const handleClose = useCallback(() => {
        setState(null);
    }, []);

    const handleConfirm = useCallback(() => {
        setState(null);
        pendingRef.current?.resolve(true);
    }, []);

    const handleCancel = useCallback(() => {
        setState(null);
        pendingRef.current?.resolve(false);
    }, []);

    return (
        <ConfirmDialogContext.Provider value={{ showConfirm }}>
            {children}
            {state && (
                <ConfirmDialogInternal
                    open={true}
                    state={state}
                    onClose={handleClose}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </ConfirmDialogContext.Provider>
    );
};

// ---- Диалог через createPortal ----
const ConfirmDialogInternal: FC<{
    open: boolean;
    state: ConfirmDialogState;
    onClose: () => void;
    onConfirm: () => void;
    onCancel: () => void;
}> = ({ open, state, onClose, onConfirm, onCancel }) => {
    const { colors } = useTheme();

    const root = document.getElementById('confirm-dialog-root');
    if (!open || !root) return null;

    const style: React.CSSProperties = {
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        backgroundColor: colors.backdrop,
    };

    const contentStyle: React.CSSProperties = {
        position: 'relative',
        backgroundColor: colors.dialogBg,
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    };

    const buttonsStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '24px',
    };

    const buttonStyle = (variant: 'confirm' | 'cancel'): React.CSSProperties => ({
        padding: '8px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 500,
        backgroundColor: variant === 'confirm' ? colors.buttonConfirmBg : colors.buttonCancelBg,
        color: variant === 'confirm' ? colors.buttonConfirmText : colors.buttonCancelText,
    });

    return createPortal(
        <div style={style} onClick={onClose}>
            <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
                <h2 style={{ margin: '0 0 8px', fontSize: '18px', color: colors.dialogHeading }}>{state.title}</h2>
                <p style={{ margin: '0 0 20px', fontSize: '14px', color: colors.dialogText, lineHeight: '1.5' }}>
                    {state.description}
                </p>
                <div style={buttonsStyle}>
                    <button type="button" style={buttonStyle('cancel')} onClick={onCancel}>
                        Отмена
                    </button>
                    <button type="button" style={buttonStyle('confirm')} onClick={onConfirm}>
                        Подтвердить
                    </button>
                </div>
            </div>
        </div>,
        root,
    );
};

// ---- Хук для чтения контекста ----
export const useConfirmDialog = (): UseConfirmDialogResult => {
    const context = useContext(ConfirmDialogContext);
    if (!context) {
        throw new Error('useConfirmDialog must be used within ConfirmDialogProvider');
    }
    return context;
};
