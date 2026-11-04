import ky from 'ky';

import { getEnvVariable } from '6-shared/lib/vite';

export const api = ky.create({ prefixUrl: getEnvVariable('VITE_API_URL') });
