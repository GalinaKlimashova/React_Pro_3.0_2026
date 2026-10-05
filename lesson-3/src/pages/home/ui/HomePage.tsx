import type { Task } from "entities/task";
import type { Filter } from "features/tasksList/model/useTasks";
import type React from "react";
import { TasksWidget } from "widgets/tasks";
import griffindor from "../../../assets/griffindor.jpeg";
import slytherin from "../../../assets/slytherin.jpg";
import styles from "./HomePage.module.css";
import type { StudentInfo } from "../model/types";

type Props = {
  filter: Filter;
  students: StudentInfo[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  removingId: string,
  setRemovingId: React.Dispatch<React.SetStateAction<string>>,
};

export function HomePage({
  filter, students,
  removingId, setTasks, setRemovingId }: Props) {
  return (
    <div className={styles.homePage}>
      {students.map((student: StudentInfo) => (
        <div key={student.name} className={styles.card}>

          <div className={styles.studentData}>
            <div className={styles.studentData}> {student.house === "Griffindor"
              ? <img className={styles.cardImage} src={griffindor} />
              : <img className={styles.cardImage} src={slytherin} />}
            </div>
            <div className={styles.studentData}><p>{student.name}</p></div>
          </div>

          <div><p>позиция: {student.place}</p></div>

          <TasksWidget
            setTasks={setTasks}
            filter={filter}
            removingId={removingId}
            setRemovingId={setRemovingId}
          />
        </div>
      ))}
    </div>
  );
}
