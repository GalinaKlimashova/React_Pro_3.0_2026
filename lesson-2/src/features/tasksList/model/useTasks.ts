import type { Task } from "entities/task";
import { useEffect, useMemo, useState } from "react";
import { allStr, completedStr } from "shared/Initialdata/constants";

export type Filter = 'all' | 'completed' | 'incomplete';

export function useTasks(
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    filter: Filter,
    removingId: string) {

    const [tasksRes, setTasksRes] = useState<Task[]>(tasks);
    const [tasksFilter, setTasksFilter] = useState<Task[]>(tasks);


    async function setFilter(newFilter: Filter, updatedTasks: Task[]) {
        if (newFilter === allStr) {
            setTasksRes(updatedTasks);
        } else if (newFilter === completedStr) {
            setTasksRes(updatedTasks.filter((elem) => elem.completed));
        } else {
            setTasksRes(updatedTasks.filter((elem) => !elem.completed));
        }
    }

    const setFilterWithUseMemo = useMemo(() => (newFilter: Filter, updatedTasks: Task[]) => {
        return setFilter(newFilter, updatedTasks);
    }, []);

    async function removeTask(id: string, updatedTasks: Task[]) {
        const upadetTaskList = updatedTasks.filter((task: Task) => {
            return task.id !== id;
        });
        setTasksRes(upadetTaskList);
        setTasks(upadetTaskList);
        setTasksFilter(upadetTaskList);
    }

    const removeTaskWithUseCallback = useMemo(() => (id: string, updatedTasks: Task[]) => {
        return removeTask(id, updatedTasks);
    }, []);

    useEffect(() => {
        Promise.resolve().then(() => {
            // with useMemo()
            setFilterWithUseMemo(filter, tasksFilter);

            //without useMemo()
            // setFilter(filter, tasksFilter);
        });
    }, [filter, tasksFilter]);

    useEffect(() => {
        if (removingId) {
            Promise.resolve().then(() => {
                // with useCallback()
                removeTaskWithUseCallback(removingId, tasksRes);
                // without useCallback()
                // removeTask(removingId, tasksRes);
            });
        }
    }, [removingId]);

    return {
        tasksRes
    }
}