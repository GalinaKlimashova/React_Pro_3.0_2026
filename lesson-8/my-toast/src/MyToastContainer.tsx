import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ToastModel } from './types.ts';
import './styles.scss';
import { toastObserver } from './toastObserver.ts';

interface Settings {
    rootIdElement?: string;
    position: 'top-right' | 'top-left';
}

export const MyToastContainer = ({ position }: Settings) => {
    return createPortal(
        <div className={`myToast__container myToast__container--${position}`}>
            <ToastManager />
        </div>,
        document.body,
    );
};

type CloseHandler = (id: ToastModel['id']) => void;

const ToastManager = () => {
    const [toasts, setToasts] = useState<ToastModel[]>([]);

    useEffect(() => {
        const subscriber = (toast: ToastModel) => setToasts((prev) => [toast, ...prev]);

        const unsubscribe = toastObserver.subscribe(subscriber);

        return unsubscribe;
    }, []);

    const closeHandler: CloseHandler = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return toasts.map((toast) => <Toast {...toast} closeHandler={closeHandler} />);
};

const Toast = ({ title, type, id, closeHandler }: ToastModel & { closeHandler: CloseHandler }) => {
    useEffect(() => {
        setTimeout(() => {
            closeHandler(id);
        }, 5e3);
    }, [closeHandler, id]);

    return <div className={`myToast__toast myToast__toast--${type}`}>{title}</div>;
};
