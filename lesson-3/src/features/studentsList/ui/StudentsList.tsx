import { StudentCard, type StudentInfo } from "entities/student";
import styles from "./StudentsList.module.css";
import type { Filter } from "features/tasksList/model/useTasks";
import type { Task } from "entities/task";
import React from "react";

type Props = {
  students: StudentInfo[],
  filter: Filter,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  removingId: string,
  setRemovingId: React.Dispatch<React.SetStateAction<string>>,
};

export const StudentsList = React.memo(function StudentsList({ students,
  filter,
  removingId,
  setRemovingId,
  setTasks
}: Props) {
  return (
    <div className={styles.studentList}>
      {students.map((student: StudentInfo) => (
        <div key={student.name} className={styles.tasks}>
          <StudentCard
            key={student.name}
            filter={filter}
            student={student}
            setTasks={setTasks}
            removingId={removingId}
            setRemovingId={setRemovingId}
          />
        </div>
      ))}
    </div>
  );
});