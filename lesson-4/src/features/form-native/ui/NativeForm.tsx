import { useActionState } from "react";
import { submitFormAction, initialFormState } from "../model";
import styles from "./NativeForm.module.css";

export const NativeForm = () => {
  const [state, formAction, isPending] = useActionState(
    submitFormAction,
    initialFormState
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Регистрация (React 19)</h2>

      <form action={formAction} className={styles.form}>
        {/* Инпут: Имя пользователя */}
        <div className={styles.fieldGroup}>
          <label htmlFor="username" className={styles.label}>Имя пользователя</label>
          <input
            id="username"
            name="username" // По этому имени FormData найдет значение
            type="text"
            disabled={isPending}
            className={`${styles.input} ${state.errors.username ? styles.inputError : ""}`}
            placeholder="Иван Иванов"
          />
          {state.errors.username && (
            <span className={styles.errorText}>{state.errors.username}</span>
          )}
        </div>

        {/* Инпут: Email */}
        <div className={styles.fieldGroup}>
          <label htmlFor="email" className={styles.label}>Электронная почта</label>
          <input
            id="email"
            name="email"
            type="text"
            disabled={isPending}
            className={`${styles.input} ${state.errors.email ? styles.inputError : ""}`}
            placeholder="example@mail.com"
          />
          {state.errors.email && (
            <span className={styles.errorText}>{state.errors.email}</span>
          )}
        </div>

        {/* Кнопка отправки */}
        <button type="submit" disabled={isPending} className={styles.submitBtn}>
          {isPending ? <span className={styles.spinner}></span> : "Отправить данные"}
        </button>

        {/* Общий статус ответа от сервера */}
        {state.message && (
          <div className={`${styles.statusMessage} ${state.success ? styles.success : styles.error}`}>
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
};
