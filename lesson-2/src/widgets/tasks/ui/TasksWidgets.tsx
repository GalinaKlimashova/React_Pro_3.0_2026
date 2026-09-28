import type { Task } from "entities/task";
import { TasksList } from "features/tasksList";
import { useTasks, type Filter } from "features/tasksList/model/useTasks";
import React from "react";

type Props = {
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    filter: Filter,
    removingId: string
};

export const TasksWidget = React.memo(function TasksWidget({
    tasks,
    setTasks,
    filter,
    removingId,
}: Props) {

    const { tasksRes } = useTasks(tasks,
        setTasks,
        filter,
        removingId);

    return <TasksList tasks={tasksRes} />;
});