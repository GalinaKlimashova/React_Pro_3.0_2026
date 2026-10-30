export function hasOwnProperty<X extends object, Y extends PropertyKey>(
    obj: X,
    prop: Y,
): obj is X & Record<Y, unknown> {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

// From https://github.com/sindresorhus/is/blob/master/source/index.ts
export function isPlainObject(value: unknown): value is Record<PropertyKey, unknown> {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);

    return prototype === null || prototype === Object.getPrototypeOf({});
}

export const getMessageFromError = (error: unknown) =>
    isPlainObject(error) && hasOwnProperty(error, 'message') && typeof error.message === 'string' && error.message;
