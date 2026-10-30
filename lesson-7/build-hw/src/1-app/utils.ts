export function greet(name: string): string {
    return `Hello, ${name}!`;
}

export function sum(a: number, b: number): number {
    return a + b;
}

export function repeat(str: string, times: number): string {
    return str.repeat(times);
}

export function uuid(): string {
    return crypto.randomUUID();
}

