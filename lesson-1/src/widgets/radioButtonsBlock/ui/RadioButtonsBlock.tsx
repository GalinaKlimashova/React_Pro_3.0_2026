import { type Filter } from "features/tasksList/model/useTasks";
import { useState } from "react";
import { allStr, completedStr, filterBtnTitle, incompleteStr } from "shared/Initialdata/constants";
import { FilterButton } from "../../../shared/ui/FilterButton/FilterButton";
import styles from "./RadioButtonsBlock.module.css";

const radioButtonsBlock = "radioButtonsBlock";
const radioType = "radio";


type Props = {
    filter: Filter,
    setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

export function RadioButtonsBlock({ filter, setFilter }: Props) {
    const [selectedValue, setSelectedValue] = useState<string>(filter);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFilter(selectedValue as Filter);
    };

    return (
        <div className={styles.radioButtonContainer}>
            <form onSubmit={handleSubmit}>
                <label className={styles.labelStyle}>
                    <input
                        type={radioType}
                        name={radioButtonsBlock}
                        value={allStr}
                        checked={selectedValue === allStr}
                        onChange={handleRadioChange}
                    />
                    <p className={styles.nameStyle}>{allStr}</p>
                </label>

                <label className={styles.labelStyle}>
                    <input
                        type={radioType}
                        name={radioButtonsBlock}
                        value={completedStr}
                        checked={selectedValue === completedStr}
                        onChange={handleRadioChange}
                    />
                    <p className={styles.nameStyle}>
                        {completedStr}</p>
                </label>

                <label className={styles.labelStyle}>
                    <input
                        type={radioType}
                        name={radioButtonsBlock}
                        value={incompleteStr}
                        checked={selectedValue === incompleteStr}
                        onChange={handleRadioChange}
                    />
                    <p className={styles.nameStyle}>
                        {incompleteStr}
                    </p>
                </label>
                <FilterButton name={filterBtnTitle} />
            </form>
        </div>
    );
};