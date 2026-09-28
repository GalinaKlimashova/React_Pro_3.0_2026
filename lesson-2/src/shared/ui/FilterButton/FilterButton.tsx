import styles from "./FilterButton.module.css";

const buttonType = "submit";
type Props = {
    name: string,
    disabled?: boolean
}

export const FilterButton = ({ name, disabled }: Props) => {
    return (
        <button
            className={styles.submitButton}
            type={buttonType}
            disabled={disabled}
        >
            {name}
        </button >);
}