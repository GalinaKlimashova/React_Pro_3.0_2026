import type { StudentInfo } from "entities/student";
import type { Task } from "entities/task";
import { StudentsList } from "features/studentsList";
import type { Filter } from "features/tasksList/model/useTasks";

type Props = {
    filter: Filter;
    students: StudentInfo[];
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    removingId: string,
};

export function StudentsWidget({ filter,
    students,
    removingId,
    setTasks,
    tasks }: Props) {
    return (
        <StudentsList
            students={students}
            filter={filter}
            removingId={removingId}
            tasks={tasks}
            setTasks={setTasks} />
    )
}