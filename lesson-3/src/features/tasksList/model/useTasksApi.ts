import { useGetTasksQuery } from "entities/task";

export function useTasksList() {
    const { data = [], isLoading, error } = useGetTasksQuery();
    return {
        data,
        isLoading,
        error
    };
}