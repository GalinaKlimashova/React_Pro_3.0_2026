import { StudentsWidget } from "widgets/students";
import styles from "./HomePage.module.css";
import type { Filter } from "features/tasksList/model/useTasks";
import type { StudentInfo } from "entities/student";
import type { Task } from "entities/task";

type Props = {
  filter: Filter;
  students: StudentInfo[];
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  removingId: string,
  setRemovingId: React.Dispatch<React.SetStateAction<string>>,
};

export function HomePage({
  filter, students,
  removingId, tasks, setTasks }: Props) {

  return (
    <div className={styles.homePageContainer}>
      <StudentsWidget filter={filter}
        students={students}
        tasks={tasks}
        setTasks={setTasks}
        removingId={removingId}
      />
    </div>
  )
}
