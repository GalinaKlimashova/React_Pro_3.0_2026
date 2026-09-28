import type { Task } from "entities/task";
import type { Filter } from "features/tasksList/model/useTasks";

export interface StudentInfo {
    place: number;
    name: string;
    house: "Slytherin" | "Griffindor";
    tasks: Task[];
};

export type Props = {
    student: StudentInfo;
    filter: Filter;
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    removingId: string,
};