import type { Filter } from 'features/tasksList/model/useTasks';
import type React from 'react';
import gerb from '../../../assets/gerb.png';
import styles from "./TitleBlock.module.css";
import { RadioButtonsBlock } from 'widgets/radioButtonsBlock';
import { ListWidget } from 'widgets/listInput';
import { mainTitle, subTitle } from 'shared/Initialdata/constants';
import type { Task } from 'entities/task';

type Props = {
  // removingId: string,
  setRemovingId: React.Dispatch<React.SetStateAction<string>>,
  tasks: Task[],
  // setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  filter: Filter,
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

export function TitleBlock({ filter,
  setFilter, tasks, setRemovingId
}: Props) {
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
        </div>

      </div>
    </div>
  )
}
