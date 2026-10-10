import { TaskCard, type Task } from "entities/task";
import styles from "./TasksList.module.css";
import React from "react";

type Props = {
  tasks: Task[]
};

export const TasksList = React.memo(function TasksList({ tasks }: Props) {
  return (
    <div className={styles.tasks}>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
});

//without React.memo
// export function TasksList({ tasks }: Props) {
//   return (
//     <div className={styles.tasks}>
//       {tasks.map(task => (
//         <TaskCard key={task.id} task={task} />
//       ))}
//     </div>
//   );
// }
