
import type { Task } from 'entities/task';
import type { Filter } from 'features/tasksList/model/useTasks';
import { HomePage } from 'pages/home';
import { TitleBlock } from 'pages/TitleBlock';
import React, { useState } from 'react';
import { allStr } from 'shared/Initialdata/constants';
import { initialStudentList } from 'shared/Initialdata/studentData';
import { initialTasksList } from 'shared/Initialdata/taskData';
import styles from './HomeMiddleware.module.css';
import type { StudentInfo } from 'pages/home/model/types';

export const HomeMiddleware = React.memo(function HomeMiddleware() {
    const [filter, setFilter] = useState<Filter>(allStr);
    const [tasks, setTasks] = useState<Task[]>(initialTasksList as Task[]);
    const [students] = useState<StudentInfo[]>(initialStudentList as StudentInfo[]);
    const [removingId, setRemovingId] = useState<string>("");

    return (
        <div className={styles.generalSettings}>
            <TitleBlock
                filter={filter}
                setFilter={setFilter}
                tasks={tasks}
                setRemovingId={setRemovingId} />

            <HomePage
                filter={filter}
                setTasks={setTasks}
                removingId={removingId}
                setRemovingId={setRemovingId}
                students={students}
            />
        </div >);
})
