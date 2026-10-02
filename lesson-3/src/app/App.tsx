import type { StudentInfo } from 'entities/student';
import type { Task } from 'entities/task';
import type { Filter } from 'features/tasksList/model/useTasks';
import { useTasksList } from 'features/tasksList/model/useTasksApi';
import { HomePage } from 'pages/home';
import { TitleBlock } from 'pages/TitleBlock';
import { useEffect, useState } from 'react';
import { allStr } from 'shared/Initialdata/constants';
import { initialStudentList } from 'shared/Initialdata/studentData';
import { initialTasksList } from 'shared/Initialdata/taskData';
import styles from './App.module.css';

function App() {
  const { data: remoteTasks, isLoading, error } = useTasksList();
  const [filter, setFilter] = useState<Filter>(allStr);
  const [tasks, setTasks] = useState<Task[]>(initialTasksList as Task[]);
  const [students, setStudents] = useState<StudentInfo[]>(initialStudentList as StudentInfo[]);
  const [removingId, setRemovingId] = useState<string>("");

  async function updatTasksArray(newTasks: Task[]) {
    setTasks(newTasks);
    const res = students.map((elem) => {
      elem.tasks = newTasks;
      return elem;
    });
    setStudents(res);
  }

  useEffect(() => {
    if (remoteTasks.length) {
      Promise.resolve().then(() => {
        updatTasksArray(remoteTasks);
      });
    }
  }, [remoteTasks]);

  if (error) {
    return <>{error}</>
  }

  return (
    <div className={styles.container}>
      <TitleBlock
        filter={filter}
        setFilter={setFilter}
        tasks={tasks}
        setRemovingId={setRemovingId} />

      <>{isLoading ? "Вы видите данные по умолчанию. С сервера идёт загрузка" : ""}</>

      <HomePage
        filter={filter}
        setTasks={setTasks}
        removingId={removingId}
        setRemovingId={setRemovingId}
        students={students}
      />
    </div >
// =======
// import { HomeMiddleware } from 'features/homeMiddleware';
// import styles from "./App.module.css";

// function App() {
//   return (
//     <div className={styles.body}>
//       <HomeMiddleware />
//     </div>
// >>>>>>> origin/master
  )
}

export default App