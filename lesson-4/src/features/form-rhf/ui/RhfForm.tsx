import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RenderCounter } from "@shared/ui";
import { groupRegistrationSchema, defaultValues } from "../model";
import type { GroupRegistrationValues } from "../model";
import styles from "./RhfForm.module.css";

export const RhfForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<GroupRegistrationValues>({
    resolver: zodResolver(groupRegistrationSchema),
    defaultValues,
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "passengers",
  });

  const onSubmit = (values: GroupRegistrationValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div>
      {/* <RenderCounter name="React Hook Form" /> */}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Название группы пассажиров</label>
          <input
            {...register("groupName")}
            className={`${styles.input} ${touchedFields.groupName && errors.groupName ? styles.inputError : ""}`}
            placeholder="Например: Сборная по футболу"
          />
          {errors.groupName && (
            <div className={styles.errorText}>{errors.groupName.message}</div>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Контактный Email руководителя</label>
          <input
            type="email"
            {...register("contactEmail")}
            className={`${styles.input} ${touchedFields.contactEmail && errors.contactEmail ? styles.inputError : ""}`}
            placeholder="manager@example.com"
          />
          {errors.contactEmail && (
            <div className={styles.errorText}>
              {errors.contactEmail.message}
            </div>
          )}
        </div>

        <div className={styles.arrayContainer}>
          <h3>Список пассажиров</h3>

          <div>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.arrayRow}>
                <div className={`${styles.fieldGroup} ${styles.flexChild}`}>
                  <label className={styles.label}>Имя №{index + 1}</label>
                  <input
                    {...register(`passengers.${index}.firstName`)}
                    className={`${styles.input} ${errors.passengers?.[index]?.firstName ? styles.inputError : ""}`}
                  />
                  {errors.passengers?.[index]?.firstName && (
                    <div className={styles.errorText}>
                      {errors.passengers[index]?.firstName?.message}
                    </div>
                  )}
                </div>

                <div className={`${styles.fieldGroup} ${styles.flexChild}`}>
                  <label className={styles.label}>Фамилия №{index + 1}</label>
                  <input
                    {...register(`passengers.${index}.lastName`)}
                    className={`${styles.input} ${errors.passengers?.[index]?.lastName ? styles.inputError : ""}`}
                  />
                  {errors.passengers?.[index]?.lastName && (
                    <div className={styles.errorText}>
                      {errors.passengers[index]?.lastName?.message}
                    </div>
                  )}
                </div>

                {fields.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => remove(index)}
                  >
                    Удалить
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className={styles.addBtn}
              onClick={() => append({ firstName: "", lastName: "" })}
            >
              + Добавить пассажира
            </button>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Забронировать
        </button>
      </form>
    </div>
  );
};
