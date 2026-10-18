import { Card, Input } from '@shared/ui';
import { useEffect, useRef, useState } from 'react';
import styles from './PreviousInput.module.css';
import { inputLabel, previousInputCardTitle } from './constants';
import { placeholderText } from '@/shared/constants';

export const PreviousInput = () => {
  const [name, setName] = useState("Иван");

  const ref = useRef<string>('');

  useEffect(() => {
    ref.current = name;
  }, [name]);

  return (
    <Card title={previousInputCardTitle}>
      <div className={styles.container}>
        <div className={styles.profileCard}>
          <div className={styles.formGroup}>
            <Input
              label={inputLabel}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={placeholderText}
            />
          </div>
          <div>{`Предыдущее значение: ${ref.current}`}</div>
        </div>
      </div>
    </Card>
  );
};
