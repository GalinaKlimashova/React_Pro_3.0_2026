import type { Filter } from 'features/tasksList/model/useTasks';
import type React from 'react';
import gerb from '../../../assets/gerb.png';
import styles from "./TitleBlock.module.css";
import { RadioButtonsBlock } from 'widgets/radioButtonsBlock';
import { ListWidget } from 'widgets/listWidget';
import { mainTitle, subTitle } from 'shared/Initialdata/constants';
import type { Task } from 'entities/task';
import { useEffect, useState } from 'react';

type Props = {
  tasks: Task[],
  filter: Filter,
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
  setRemovingId: React.Dispatch<React.SetStateAction<string>>,
}

export function TitleBlock({ filter,
  setFilter, tasks, setRemovingId
}: Props) {

  const [tasksRes, setTasksRes] = useState<Task[]>(tasks);

  async function updateTasks(newTaskArray: Task[]) {
    setTasksRes(newTaskArray);
  }

  useEffect(() => {
    if (JSON.stringify(tasks) !== JSON.stringify(tasksRes)) {
      Promise.resolve().then(() => {
        updateTasks(tasks);
      });
    }
  }, [tasks]);

  return (
    <div className={styles.titleBlock}>
      <div className={styles.gerbBlock}><img className={styles.gerb} src={gerb} /></div>

      <div className={styles.title}>
        <div><h1>{mainTitle}</h1></div>

        <div className={styles.subTitleBlock}>
          <div className={styles.subTitle}>
            <h2 className={styles.subTitle}>{subTitle}</h2>
          </div>
          <RadioButtonsBlock filter={filter} setFilter={setFilter} />
          <ListWidget
            tasks={tasks}
            setRemovingId={setRemovingId}
          />
          <div>Счетчик: {tasks.length}</div>
        </div>

      </div>
    </div>
  )
}
