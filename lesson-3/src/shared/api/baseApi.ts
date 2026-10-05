import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQueryUrl = "https://jsonplaceholder.typicode.com";

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: baseQueryUrl }),
    tagTypes: ['Tasks'],
    // Оставляем пустым, эндпоинты будут внедряться из другого файла
    endpoints: () => ({}),
});
