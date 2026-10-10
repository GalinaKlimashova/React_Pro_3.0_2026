import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { Card, Input } from "@shared/ui";
import styles from "./SearchDelayPage.module.css";

export const SearchDelayPage = () => {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const timerRef = useRef<number | null>(null);

  const addLog = (msg: string) => {
    setLogs((prev) =>
      [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev],
    );
  };

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
        addLog(`API: Поиск по "${value}"...`);
      }
    }, 500);
  };

  //Важно!
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Card title="Кейс 4: Управление таймерами" subtitle="Debounce">
      <div className={styles.container}>
        <div className={styles.searchBox}>
          <Input
            label="Живой поиск"
            value={query}
            onChange={handleChange}
            placeholder="Начните печатать..."
          />

          <div className={styles.statusArea}>
            <div className={styles.statusRow}>
              <span>Статус:</span>
              <span className={styles.indicator}>
                {isTyping ? "Набор текста..." : "Готов"}
              </span>
            </div>
          </div>

          <div className={styles.logBox}>
            {logs.length === 0
              ? "> Логи API запросов появятся здесь"
              : logs.map((log, i) => <div key={i}>{log}</div>)}
          </div>
        </div>
      </div>
    </Card>
  );
};
