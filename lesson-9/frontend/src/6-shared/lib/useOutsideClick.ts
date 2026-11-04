import { useEffect, type RefObject } from 'react';

interface UseOutsideClickParams<T extends HTMLElement> {
    ref: RefObject<T | null>;
    callback: () => void;
}

export const useOutsideClick = <T extends HTMLElement>({ ref, callback }: UseOutsideClickParams<T>) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};
