import type { Task } from "entities/task";
import { useEffect, useMemo, useState } from "react";
import { allStr, completedStr } from "shared/Initialdata/constants";
import { useTasksList } from "./useTasksApi";

export type Filter = 'all' | 'completed' | 'incomplete';

export function useTasks(
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    filter: Filter,
    removingId: string,
    setRemovingId: React.Dispatch<React.SetStateAction<string>>,
) {
    const { data: remoteTasks } = useTasksList();

    const [tasksRes, setTasksRes] = useState<Task[]>(remoteTasks);
    const [tasksFilter, setTasksFilter] = useState<Task[]>(remoteTasks);
    const [tasksExist, setTasksExist] = useState<Task[]>(remoteTasks);

    async function updateTasks(newTaskArray: Task[]) {
        setTasksRes(newTaskArray);
        setTasksFilter(newTaskArray);
        setTasks(newTaskArray);
        setTasksExist(newTaskArray);
    }

    useEffect(() => {
        if (JSON.stringify(remoteTasks) !== JSON.stringify(tasksRes)) {
            Promise.resolve().then(() => {
                updateTasks(remoteTasks);
            });
        }
    }, [remoteTasks]);

    async function setFilter(newFilter: Filter,
        updatedTasks: Task[],
        tasksExist: Task[]) {
        if (newFilter === allStr) {
            setTasksRes(tasksExist);
        } else if (newFilter === completedStr) {
            setTasksRes(updatedTasks.filter((elem) => elem.completed));
        } else {
            setTasksRes(updatedTasks.filter((elem) => !elem.completed));
        }
    }

    const setFilterWithUseMemo = useMemo(() => (newFilter: Filter, updatedTasks: Task[], tasksExist: Task[]) => {
        return setFilter(newFilter, updatedTasks, tasksExist);
    }, []);

    async function removingTask(id: string,
        updatedTasks: Task[],
        tasksExist: Task[]
    ) {
        const updatedWithFilter = updatedTasks.filter((task: Task) => {
            return Number(task.id) !== Number(id);
        });
        setTasksRes(updatedWithFilter);
        setTasksFilter(updatedWithFilter);

        const updatedFullList = tasksExist.filter((task: Task) => {
            return Number(task.id) !== Number(id);
        });
        setTasksExist(updatedFullList);
        setTasks(updatedFullList);
        setRemovingId("");
    }

    const removeTask = useMemo(() => (id: string,
        updatedTasks: Task[],
        tasksExist: Task[]) => {
        return removingTask(id, updatedTasks, tasksExist);
    }, []);

    useEffect(() => {
        Promise.resolve().then(() =>
            setFilterWithUseMemo(filter, tasksFilter, tasksExist)
        );
    }, [filter, tasksFilter]);

    useEffect(() => {
        if (removingId) {
            Promise.resolve().then(() =>
                removeTask(removingId,
                    tasksRes,
                    tasksExist));

        }
    }, [removingId, filter]);

    return {
        tasksRes
    }
}