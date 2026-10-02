import { useState } from "react";
import type { StudentInfo } from "entities/student";
import { initialStudentList } from "shared/Initialdata/studentData";

export function useStudentsList() {
  const [students] = useState<StudentInfo[]>(initialStudentList as StudentInfo[]);
  return {
    students
  };
}
