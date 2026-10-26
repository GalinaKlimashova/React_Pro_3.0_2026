import { useEffect, useRef, type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { getModalContainer } from './utils.ts';
import { MdOutlineClose } from 'react-icons/md';

import './styles.scss';

interface Props {
    isOpen: boolean;
    title: string;
    body: ReactNode;
    closeHandler: () => void;
}

export const Modal: FC<Props> = ({ isOpen, ...restProps }) => {
    const parentModalElement = getModalContainer();
    if (!parentModalElement) return null;

    return createPortal(
        <div className={`myModal__overlay ${isOpen && 'myModal__overlay--open'}`}>
            <ModalInner {...restProps} isOpen={isOpen} />
        </div>,
        parentModalElement,
    );
};

const ModalInner: FC<Props> = ({ title, isOpen, closeHandler, body }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                closeHandler();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, closeHandler]);

    return (
        <div ref={ref} className={`myModal__container ${isOpen && 'myModal__container--open'}`}>
            <div className="myModal__header">
                <span className="myModal__title">{title}</span>
                <MdOutlineClose onClick={closeHandler} className="myModal__closeIcon" />
            </div>
            <div>{body}</div>
        </div>
    );
};
