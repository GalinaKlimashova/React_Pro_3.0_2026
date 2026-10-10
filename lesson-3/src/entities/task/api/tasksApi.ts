import { baseApi } from 'shared/api/baseApi';
import type { Task } from '../model/types';

const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<Task[], void>({
            query: () => 'todos',
            transformResponse: (response: Task[]) => response,
            providesTags: ['Tasks'],
        })
    }),
    // Предотвращает случайную перезапись при hot-reload
    overrideExisting: false,
});

export const {
    useGetTasksQuery
} = tasksApi;
