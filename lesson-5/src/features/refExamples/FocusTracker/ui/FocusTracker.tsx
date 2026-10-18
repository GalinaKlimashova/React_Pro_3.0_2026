import { placeholderText } from '@/shared/constants';
import { Button, Card, Input } from '@shared/ui';
import { useEffect, useRef } from 'react';
import type { InputData } from '../model/types';
import styles from './FocusTracker.module.css';

const firstLabel = "Первый";
const secondLabel = "Второй";
const inputType = "text";

export const FocusTracker = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<InputData>({
    clickCount: 0,
    isFirstFocus: true
  });

  useEffect(() => {
    firstInputRef.current?.focus();
    firstInputRef.current?.select();
  }, []);

  const handleEdit = () => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
      firstInputRef.current?.select();
    }
  };

  // Обработчик события фокуса
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const formElement = event.relatedTarget;
    if (formElement) {
      const isFromInput2 = formElement === secondInputRef.current;
      if (isFromInput2 || !ref.current.isFirstFocus) {
        ref.current.clickCount += 1;
        ref.current.isFirstFocus = true;
        console.log(`Количество: ${ref.current.clickCount}`);
      }
    }
  };

  return (
    <Card title="3. Компонент FocusTracker (3 балла)">
      <div className={styles.container}>
        <div className={styles.profileCard}>
          <div className={styles.formGroup}>
            <Input
              ref={firstInputRef}
              type={inputType}
              onFocus={handleFocus}
              label={firstLabel}
              defaultValue={firstLabel}
              placeholder={placeholderText}
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              ref={secondInputRef}
              type={inputType}
              onFocus={() => {
                ref.current.isFirstFocus = false;
                handleFocus;
              }}
              label={secondLabel}
              defaultValue={secondLabel}
              placeholder={placeholderText}
            />
          </div>

          <div className={styles.actions}>
            <Button
              onClick={handleEdit}
              variant="primary">
              Сфокусировать на первом
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

