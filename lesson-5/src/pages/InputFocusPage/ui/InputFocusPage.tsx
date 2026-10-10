import { useState, useRef, useEffect } from "react";
import { Card, Button, Input } from "@shared/ui";
import styles from "./InputFocusPage.module.css";

export const InputFocusPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Иван");

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Данные сохранены:", name);
  };

  return (
    <Card
      title="Кейс 3: Доступ к DOM через Эффекты"
      subtitle="Синхронизация состояния интерфейса и фокуса ввода"
    >
      <div className={styles.container}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <span className={styles.label}>Профиль</span>
            <span
              className={`${styles.status} ${isEditing ? styles.statusEdit : styles.statusActive}`}
            >
              {isEditing ? "Редактирование" : "Активен"}
            </span>
          </div>

          <div className={styles.formGroup}>
            <Input
              ref={nameInputRef}
              label="Полное имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              placeholder="Введите ваше имя"
            />
          </div>

          <div className={styles.actions}>
            {!isEditing ? (
              <Button onClick={handleEdit} variant="secondary">
                Редактировать
              </Button>
            ) : (
              <Button onClick={handleSave} variant="primary">
                Сохранить
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
