import type { StudentInfo } from "entities/student";
import type { Task } from "entities/task";
import { StudentsList } from "features/studentsList";
import type { Filter } from "features/tasksList/model/useTasks";

type Props = {
    filter: Filter;
    students: StudentInfo[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    removingId: string,
    setRemovingId: React.Dispatch<React.SetStateAction<string>>,
};

export function StudentsWidget({ filter,
    students,
    removingId,
    setTasks,
    setRemovingId
}: Props) {
    return (
        <StudentsList
            students={students}
            filter={filter}
            removingId={removingId}
            setRemovingId={setRemovingId}
            setTasks={setTasks} />
    )
}