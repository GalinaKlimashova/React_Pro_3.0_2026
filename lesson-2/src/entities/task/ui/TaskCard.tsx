import type { Task } from "../model/types";
import styles from "./TaskCard.module.css";
import red from "../../../assets/red.png";
import green from "../../../assets/green.jpeg";

type Props = {
    task: Task
};

export function TaskCard({ task }: Props) {
    return (
        <div className={styles.card}>
            <div>{task.completed
                ? <img className={styles.flag} src={green} />
                : <img className={styles.flag} src={red} />}
            </div>
            <div className={styles.taskTitle}><p>{task.title}</p></div>
        </div>
    );
}