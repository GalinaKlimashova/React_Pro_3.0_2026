import { hasOwnProperty, isPlainObject } from './common';

export interface SaveToLS {
    state: unknown;
    key: string;
    subTitle?: string;
}

export const saveToLocaleStorage = ({ state, key, subTitle }: SaveToLS): void => {
    try {
        if (subTitle) {
            const prevDataByKey = loadFromLS<Record<string, unknown>>({ key });
            const newData = {
                ...prevDataByKey,
                [subTitle]: state,
            };
            const serializedState = JSON.stringify(newData);
            localStorage.setItem(key, serializedState);

            return;
        }

        const serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    } catch (err) {
        console.error(err);
    }
};

interface LoadFromLS {
    key: string;
    subTitle?: string;
}

export const loadFromLS = <T>({ key, subTitle }: LoadFromLS): T | undefined => {
    try {
        const serializedState = localStorage.getItem(key);

        if (serializedState) {
            if (subTitle) {
                const parsedData = JSON.parse(serializedState);
                const returnData =
                    isPlainObject(parsedData) && hasOwnProperty(parsedData, subTitle)
                        ? parsedData[subTitle]
                        : undefined;

                return returnData as T;
            }

            return JSON.parse(serializedState);
        }

        return undefined;
    } catch (err) {
        console.error(err);

        return undefined;
    }
};

interface ClearLS {
    key: string;
    subTitle?: string;
}

export const clearLS = ({ key, subTitle }: ClearLS): void => {
    try {
        const serializedState = localStorage.getItem(key);

        if (serializedState) {
            if (subTitle) {
                const parsedData = JSON.parse(serializedState);

                if (isPlainObject(parsedData) && hasOwnProperty(parsedData, subTitle)) {
                    delete parsedData[subTitle];
                    saveToLocaleStorage({ key, state: parsedData });
                }
            } else {
                localStorage.removeItem(key);
            }
        }
    } catch (err) {
        console.error(err);
    }
};
