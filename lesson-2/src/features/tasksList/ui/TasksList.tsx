import { TaskCard, type Task } from "entities/task";
import styles from "./TasksList.module.css";

type Props = {
  tasks: Task[]
};

export function TasksList({ tasks }: Props) {
  return (
    <div className={styles.tasks}>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}