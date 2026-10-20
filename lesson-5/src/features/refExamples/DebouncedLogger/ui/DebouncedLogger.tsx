import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { Card, Input } from "@shared/ui";
import styles from "./DebouncedLogger.module.css";

export const DebouncedLogger = () => {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const timerRef = useRef<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsTyping(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsTyping(false);
      if (value) {
        console.log(value);
      }
    }, 1000);
  };

  //Важно!
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Card title="4. Компонент DebouncedLogger с useRef (1.5 балла)"
      subtitle="Debounce">
      <div className={styles.container}>
        <div className={styles.searchBox}>
          <Input
            label="Поле ввода"
            value={query}
            onChange={handleChange}
            placeholder="Начните печатать..."
          />

          <div className={styles.statusArea}>
            <div className={styles.statusRow}>
              <span>Статус:</span>
              <span className={styles.indicator}>
                {isTyping ? "Набор текста..." : "Готов (result in DevTools.Console)"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
