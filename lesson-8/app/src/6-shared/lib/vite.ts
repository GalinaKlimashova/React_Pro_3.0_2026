export const getEnvVariable = (key: string, fallback = '') => {
    const value = import.meta.env[key];

    if (value === undefined) return fallback;

    return value;
};
