import { useEffect, useRef, useState } from 'react';

export const useThrottle = <T>(value: T, ms: number): T => {
    const [throttledValue, setThrottledValue] = useState(value);

    const metaInfo = useRef({
        isActive: false,
        actualValue: value,
    });

    useEffect(() => {
        metaInfo.current.actualValue = value;

        if (metaInfo.current.isActive) {
            return;
        }

        metaInfo.current.isActive = true;

        setTimeout(() => {
            setThrottledValue(metaInfo.current.actualValue);
            metaInfo.current.isActive = false;
        }, ms);
    }, [ms, value]);

    return throttledValue;
};
