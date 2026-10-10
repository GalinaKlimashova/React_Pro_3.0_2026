import { useRef, useState  } from 'react';
import { Card, Button } from '@shared/ui';
import styles from './PreviousValuePage.module.css';

export const PreviousValuePage = () => {
  const [count, setCount] = useState(0);

  const prevCountRef = useRef<number | null>(null);

  const handleIncrement = () => {
    const previous = count;
    prevCountRef.current = previous;

    const next = count + 1;
    setCount(next);

    const diff = next - previous;
    console.log(`Было: ${previous}, Стало: ${next}, Динамика: +${diff}`);
  };

  return (
    <Card
      title="Кейс 2: Предыдущее значение"
      subtitle="с помощью useRef"
    >
      <div className={styles.container}>
        <div className={styles.demoBox}>
          <div className={styles.valueRow}>
            <span>Текущее значение:</span>
            <span className={styles.currentDisplay}>{count}</span>
          </div>
        </div>

        <div className={styles.controls}>
          <Button onClick={handleIncrement} variant="primary">
            Увеличить (+1)
          </Button>
        </div>
      </div>
    </Card>
  );
};
