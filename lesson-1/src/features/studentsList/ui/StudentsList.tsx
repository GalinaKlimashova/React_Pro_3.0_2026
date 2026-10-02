import { StudentCard, type StudentInfo } from "entities/student";
import styles from "./StudentsList.module.css";
import type { Filter } from "features/tasksList/model/useTasks";
import type { Task } from "entities/task";

type Props = {
  students: StudentInfo[],
  filter: Filter,
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  removingId: string,
};

export function StudentsList({ students,
  filter,
  removingId,
  setTasks,
  tasks
}: Props) {
  return (
    <div className={styles.studentList}>
      {students.map(student => (
        <div key={student.name} className={styles.tasks}>
          <StudentCard
            key={student.name}
            filter={filter}
            student={student}
            tasks={tasks}
            setTasks={setTasks}
            removingId={removingId}
          />
        </div>
      ))}
    </div>
  );
}