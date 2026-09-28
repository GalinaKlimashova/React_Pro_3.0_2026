
import type { StudentInfo } from 'entities/student';
import type { Task } from 'entities/task';
import type { Filter } from 'features/tasksList/model/useTasks';
import { HomePage } from 'pages/home';
import { TitleBlock } from 'pages/TitleBlock';
import { useState } from 'react';
import { initialStudentList } from 'shared/Initialdata/studentData';
import { initialTasksList } from 'shared/Initialdata/taskData';
import styles from './App.module.css';

function App() {
  const [filter, setFilter] = useState<Filter>("all");
  const [tasks, setTasks] = useState<Task[]>(initialTasksList);
  const [students] = useState<StudentInfo[]>(initialStudentList as StudentInfo[]);

  const [removingId, setRemovingId] = useState<string>("");
  return (
    <div className={styles.container}>
      <TitleBlock
        filter={filter}
        setFilter={setFilter}
        tasks={tasks}
        setRemovingId={setRemovingId} />

      <HomePage
        filter={filter}
        tasks={tasks}
        setTasks={setTasks}
        removingId={removingId}
        setRemovingId={setRemovingId}
        students={students}
      />
    </div >
  )
}

export default App