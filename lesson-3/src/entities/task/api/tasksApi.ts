import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Task } from '../model/types';

const baseQueryUrl = "https://jsonplaceholder.typicode.com";

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseQueryUrl }),
    tagTypes: ['Tasks'],
    endpoints: (build) => ({
        getTasks: build.query<Task[], void>({
            query: () => 'todos',
            transformResponse: (response: Task[]) => response,
            providesTags: ['Tasks'],
        })
    }),
});

export const { useGetTasksQuery } = tasksApi;