import { TaskCard, type Task } from "entities/task";
import React from "react";
import styles from "./TasksList.module.css";

type Props = {
  tasks: Task[]
};

export const TasksList = React.memo(function TasksList({ tasks }: Props) {
  return (
    <div className={styles.tasks}>
      {tasks ? tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      )) : <></>}
    </div>
  );
});
