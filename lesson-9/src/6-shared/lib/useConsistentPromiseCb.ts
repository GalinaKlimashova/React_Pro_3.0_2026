import { use } from 'react';

const cache = new Map<string, Promise<unknown>>();

export const useConsistentPromiseCb = <P>(key: string, fn: () => Promise<P>) => {
    if (!cache.has(key)) {
        cache.set(key, fn());
    }

    return use(cache.get(key) as Promise<P>);
};
