import { z } from 'zod';

export function hasOwnProperty<X extends object, Y extends PropertyKey>(
    obj: X,
    prop: Y,
): obj is X & Record<Y, unknown> {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function isPlainObject(value: unknown): value is Record<PropertyKey, unknown> {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
        return false;
    }

    const prototype = Object.getPrototypeOf(value);

    return prototype === null || prototype === Object.getPrototypeOf({});
}

export function isErrorPlainObject(value: unknown): value is Record<PropertyKey, unknown> {
    if (Object.prototype.toString.call(value) !== '[object Error]') {
        return false;
    }

    return true;
}

export const getMessageFromError = (error: unknown) => {
    return (
        (isPlainObject(error) || isErrorPlainObject(error)) &&
        hasOwnProperty(error, 'message') &&
        typeof error.message === 'string' &&
        error.message
    );
};

const ErrorSchema = z.looseObject({
    message: z.string(),
});

export const parseErrorWithZod = (error: unknown, defaultError: string) => {
    const result = ErrorSchema.safeParse(error);

    if (result.success) {
        return result.data.message;
    }

    return defaultError;
};
