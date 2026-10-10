import type { Task } from "entities/task";

export interface StudentInfo {
    place: number;
    name: string;
    house: "Slytherin" | "Griffindor";
    tasks: Task[];
};
