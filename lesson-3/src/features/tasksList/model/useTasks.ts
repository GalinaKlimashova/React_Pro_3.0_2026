import type { Task } from "entities/task";
import { useEffect, useMemo, useState } from "react";
import { allStr, completedStr } from "shared/Initialdata/constants";

export type Filter = 'all' | 'completed' | 'incomplete';

export function useTasks(
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    filter: Filter,
    removingId: string,
    setRemovingId: React.Dispatch<React.SetStateAction<string>>,
) {
    const [tasksRes, setTasksRes] = useState<Task[]>(tasks);
    const [tasksFilter, setTasksFilter] = useState<Task[]>(tasks);

    async function updateTasks(newTaskArray: Task[]) {
        setTasksRes(newTaskArray);
        setTasksFilter(newTaskArray);
    }

    useEffect(() => {
        if (JSON.stringify(tasks) !== JSON.stringify(tasksRes)) {
            Promise.resolve().then(() => {
                updateTasks(tasks);
            });
        }
    }, [tasks]);

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
            return Number(task.id) !== Number(id);
        });
        setRemovingId("");
        setTasksRes(upadetTaskList);
        setTasks(upadetTaskList);
        setTasksFilter(upadetTaskList);
    }

    const removeTaskWithUseCallback = useMemo(() => (id: string, updatedTasks: Task[]) => {
        return removeTask(id, updatedTasks);
    }, []);

    useEffect(() => {
        Promise.resolve().then(() =>
            setFilterWithUseMemo(filter, tasksFilter)
        );
    }, [filter, tasksFilter]);

    useEffect(() => {
        if (removingId) {
            Promise.resolve().then(() =>
                removeTaskWithUseCallback(removingId, tasksRes));
        }
    }, [removingId]);

    return {
        tasksRes
    }
}