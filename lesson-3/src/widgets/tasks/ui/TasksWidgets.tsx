import type { Task } from "entities/task";
import { TasksList } from "features/tasksList";
import { useTasks, type Filter } from "features/tasksList/model/useTasks";
import React from "react";

export type TasksWidgetProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    filter: Filter,
    removingId: string,
    setRemovingId: React.Dispatch<React.SetStateAction<string>>,
};

export const TasksWidget = React.memo(function TasksWidget({
    setTasks,
    filter,
    removingId,
    setRemovingId
}: TasksWidgetProps) {
    const { tasksRes } = useTasks(setTasks,
        filter,
        removingId,
        setRemovingId);

    return <TasksList tasks={tasksRes} />;
});