import { TasksWidget } from "widgets/tasks";
import griffindor from "../../../assets/griffindor.jpeg";
import slytherin from "../../../assets/slytherin.jpg";
import type { Props } from "../model/types";
import styles from "./StudentCard.module.css";

export function StudentCard({
    student, filter,
    removingId, setTasks, setRemovingId }: Props) {

    return (
        <div className={styles.card}>
            <div className={styles.studentData}>
                <div className={styles.studentData}> {student.house === "Griffindor"
                    ? <img className={styles.cardImage} src={griffindor} />
                    : <img className={styles.cardImage} src={slytherin} />}
                </div>
                <div className={styles.studentData}><p>{student.name}</p></div>
            </div>
            <div><p>позиция: {student.place}</p></div>
            <TasksWidget
                tasks={student.tasks}
                setTasks={setTasks}
                filter={filter}
                removingId={removingId}
                setRemovingId={setRemovingId}
            />
        </div>
    );
}