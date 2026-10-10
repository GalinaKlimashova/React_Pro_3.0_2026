import { useRef, useEffect } from "react";
import styles from "./RenderCounter.module.css";

export const RenderCounter = ({ name }: { name: string }) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
  });

  return (
    <div className={styles.counter}>
      <strong>{name}</strong> - Количество рендеров: {renderCount.current}
    </div>
  );
};
