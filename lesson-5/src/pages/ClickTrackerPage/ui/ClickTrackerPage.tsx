import { useState, useRef, useEffect } from "react";
import { Card, Button } from "@shared/ui";
import styles from "./ClickTrackerPage.module.css";

export const ClickTrackerPage = () => {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  const handleIncrementState = () => {
    setStateCount((prev) => prev + 1);
  };

  const handleIncrementRef = () => {
    refCount.current += 1;
    console.log("Текущее значение refCount.current:", refCount.current);
  };

  const [, forceUpdate] = useState({});
  const handleForceUpdate = () => {
    forceUpdate({});
  };

  return (
    <Card
      title="Кейс 1: сохранение значений"
      subtitle="Сравнение useState и useRef"
    >
      <div className={styles.renderBadge}>
        Количество рендеров компонента: {renderCount.current}
      </div>

      <div className={styles.grid}>
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>useState</h3>
          <p className={styles.columnDesc}>
            Изменение состояния перерисовывает компонент
          </p>
          <div className={styles.counterDisplay}>{stateCount}</div>
          <div className={styles.buttonGroup}>
            <Button onClick={handleIncrementState} variant="primary">
              +1 к stateCount
            </Button>
          </div>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>useRef</h3>
          <p className={styles.columnDesc}>
            Мутация refCount.current происходит мгновенно, а React не обновляет
            UI
          </p>
          <div className={styles.counterDisplay}>{refCount.current}</div>
          <div className={styles.buttonGroup}>
            <Button onClick={handleIncrementRef} variant="primary">
              +1 к refCount
            </Button>
            <Button onClick={handleForceUpdate} variant="secondary">
              Форсированный рендер
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
