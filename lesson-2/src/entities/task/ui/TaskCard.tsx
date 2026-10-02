import type { Task } from "../model/types";
import styles from "./TaskCard.module.css";
import red from "../../../assets/red.png";
import green from "../../../assets/green.jpeg";
import React, { useEffect } from "react";

type Props = {
    task: Task
};

export const TaskCard = React.memo(function TaskCard({ task }: Props) {
    useEffect(() => {
        console.log(`Я ${task.title}. Перерисовался`);
    }, []);
    return (
        <div className={styles.card}>
            <div>{task.completed
                ? <img className={styles.flag} src={green} />
                : <img className={styles.flag} src={red} />}
            </div>
            <div className={styles.taskTitle}><p>{task.title}</p></div>
        </div>
    );
});