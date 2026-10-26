import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';

import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';

// Типы повторяют app/src/6-shared/api/auth/types.ts
interface SignUpRequest {
    email: string;
    name: string;
    password: string;
    avatarPath?: string;
    about?: string;
    phone?: string;
}

interface SignInRequest {
    email: string;
    password: string;
}

interface SignResponseSuccess {
    user: { id: string; email: string };
    accessToken: string;
}

interface SignResponseError {
    statusCode: number;
    message: string[];
    error: string;
}

interface User extends Omit<SignUpRequest, 'password'> {
    id: string;
    passwordHash: string;
}

// In-memory хранилище
const users = new Map<string, User>(); // email -> user
const sessions = new Map<string, string>(); // accessToken -> userId

const ERROR_NAMES: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    404: 'Not Found',
    409: 'Conflict',
    500: 'Internal Server Error',
};

const sendError = (res: Response, statusCode: number, message: string[]) => {
    const body: SignResponseError = { statusCode, message, error: ERROR_NAMES[statusCode] ?? 'Error' };
    res.status(statusCode).json(body);
};

const hashPassword = (password: string) => {
    const salt = randomBytes(16).toString('hex');
    return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
};

const verifyPassword = (password: string, stored: string) => {
    const [salt, hash] = stored.split(':');
    return timingSafeEqual(Buffer.from(hash, 'hex'), scryptSync(password, salt, 64));
};

const createSession = (user: User): SignResponseSuccess => {
    const accessToken = randomBytes(32).toString('hex');
    sessions.set(accessToken, user.id);
    return { user: { id: user.id, email: user.email }, accessToken };
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim() !== '';

const getToken = (req: Request) => req.headers.authorization?.replace(/^Bearer\s+/i, '');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/auth/register', (req: Request<unknown, unknown, Partial<SignUpRequest>>, res) => {
    const { email, name, password, avatarPath, about, phone } = req.body ?? {};

    const errors: string[] = [];
    if (!isNonEmptyString(email) || !/^\S+@\S+\.\S+$/.test(email)) errors.push('email must be an email');
    if (!isNonEmptyString(name)) errors.push('name should not be empty');
    if (!isNonEmptyString(password)) errors.push('password should not be empty');
    if (errors.length) return sendError(res, 400, errors);

    const normalizedEmail = normalizeEmail(email!);
    if (users.has(normalizedEmail)) {
        return sendError(res, 409, ['User with this email already exists']);
    }

    const user: User = {
        id: randomUUID(),
        email: normalizedEmail,
        name: name!,
        passwordHash: hashPassword(password!),
        avatarPath,
        about,
        phone,
    };
    users.set(normalizedEmail, user);

    res.status(201).json(createSession(user));
});

app.post('/auth/login', (req: Request<unknown, unknown, Partial<SignInRequest>>, res) => {
    const { email, password } = req.body ?? {};

    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
        return sendError(res, 400, ['email and password are required']);
    }

    const user = users.get(normalizeEmail(email));
    if (!user || !verifyPassword(password, user.passwordHash)) {
        return sendError(res, 401, ['Invalid email or password']);
    }

    res.json(createSession(user));
});

app.post('/auth/logout', (req, res) => {
    const token = getToken(req);
    if (!token || !sessions.delete(token)) {
        return sendError(res, 401, ['Invalid or missing token']);
    }
    res.status(204).end();
});

app.use((_req, res) => sendError(res, 404, ['Not Found']));

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    sendError(res, 500, ['Internal Server Error']);
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
