import type { Task } from 'entities/task';
import React, { useState } from 'react';
import { removeBtnTitle, selectSubTitle } from 'shared/Initialdata/constants';
import { FilterButton } from 'shared/ui/FilterButton/FilterButton';
import styles from "./ListWidget.module.css";

type Props = {
    tasks: Task[],
    setRemovingId: React.Dispatch<React.SetStateAction<string>>,
}

export function ListWidget({ tasks, setRemovingId }: Props) {
    const [selectedValue, setSelectedValue] = useState<string>();

    const handleSelectChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        setSelectedValue(event.target.value);
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = tasks.filter((task) => task.id !== selectedValue) || [];
        setRemovingId(selectedValue || "");
        setSelectedValue(result[0].id || "");
    };

    return (
        <div className={styles.listContainer}>
            <form
                onChange={handleSelectChange}
                onSubmit={handleSubmit}>
                <select
                    className={styles.selectStyle}
                    defaultValue=""
                >
                    <option value="" disabled>{selectSubTitle}</option>
                    {tasks.length
                        ? tasks.map((task: Task) => (
                            <option key={task.id} value={task.id}>
                                {task.title}
                            </option>
                        )) : []}
                </select>
                <div className={styles.submitButton}>
                    <FilterButton
                        name={removeBtnTitle}
                        disabled={!tasks.length} />
                </div>
            </form>
        </div >
    );
}
