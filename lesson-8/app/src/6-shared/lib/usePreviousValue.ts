import { useRef } from 'react';

export const usePreviousValue = <T>(value: T): T | null => {
    const prevRef = useRef<{
        actualValue: T;
        prevValue: T | null;
    }>({
        actualValue: value,
        prevValue: null,
    });

    if (prevRef.current.actualValue !== value) {
        prevRef.current = {
            actualValue: value,
            prevValue: prevRef.current.actualValue,
        };
    }

    return prevRef.current.prevValue;
};
