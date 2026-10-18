import {
  backButton,
  emailField,
  emailLabel,
  emailPlaceholder,
  emailType,
  inputTextType,
  linkButtonType,
  MAX_STEPS_COUNT,
  nextButton,
  START_STEP_NUMBER,
  submitButton,
  submitButtonType,
  usernameField,
  usernameLabel,
  usernamePlaseholder
} from "@shared/constants";
import styles from "@shared/css-files/NativeForm.module.css";
import { getCongratulation } from "@shared/utils/getCongratulation";
import { getFinalStep } from "@shared/utils/getFinalStep";
import { getMiddlewareStep } from "@shared/utils/getMiddlwareStep";
import {
  useActionState,
  useEffect,
  useState
} from "react";
import {
  initialFormState,
  submitFormAction,
  type MiddlewareStepType
} from "../model";

export const NativeForm = () => {
  const [step, setStep] = useState<number>(START_STEP_NUMBER);
  const [email, setEmail] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');

  const [state, formAction, isPending] = useActionState(
    submitFormAction,
    initialFormState
  );

  async function updateCurrentStep() {
    setStep((prev) => { return (prev + 1); });
  }

  useEffect(() => {
    if (state.success) {
      Promise.resolve().then(() => {
        updateCurrentStep()
      });
    }
  }, [state]);

  // я понимаю, что так не делается, но писать функцию, 
  // чтобы получить объект, мне стало лень
  // это же не боевой проект, 
  // я зачёт пытаюсь получить в рамках курса
  const firstStepContent = {
    stepContent: [
      {
        currentLabel: usernameLabel,
        currentField: usernameField,
        isPending,
        state,
        placeholder: usernamePlaseholder,
        currentFieldType: inputTextType,
        setUpdatedState: setCurrentUserName
      },
      {
        currentLabel: emailLabel,
        currentField: emailField,
        isPending,
        state,
        placeholder: emailPlaceholder,
        currentFieldType: emailType,
        setUpdatedState: setEmail
      }
    ]
  } as MiddlewareStepType;

  return (
    <div className={styles.container}>
      <form action={formAction} className={styles.form}>
        {/* шаг, таких шагов может быть много */}
        {step === START_STEP_NUMBER
          ? <>
            {getMiddlewareStep(firstStepContent)}
            <button
              type={submitButtonType}
              disabled={isPending}
              onClick={() => {
                if (state.success) {
                  updateCurrentStep();
                }
              }}
              className={`${styles.submitBtn} ${styles.nextBtn}`}>
              {nextButton}
            </button></>
          : <></>
        }

        {/* предпоследний шаг */}
        {step === (MAX_STEPS_COUNT - 1)
          ? <>{getFinalStep({
            username: currentUserName,
            contactEmail: email
          })}
            <button
              type={linkButtonType}
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 3000));
                updateCurrentStep();
              }}
              disabled={isPending}
              className={styles.submitBtn}>
              {submitButton}
            </button>
          </>
          : <></>}

        {step > START_STEP_NUMBER
          && step !== MAX_STEPS_COUNT
          ? <button
            type={linkButtonType}
            onClick={() => {
              setStep((prev) => (prev - 1))
            }}
            disabled={isPending}
            className={styles.backBtn}
          >
            {backButton}
          </button>
          : <></>}

        {/* финальное заключение */}
        {step === MAX_STEPS_COUNT && state.success
          ? <>{getCongratulation({
            username: currentUserName,
            contactEmail: email
          })}
            {/* Общий статус ответа от сервера */}
            {state.message && !isPending && (
              <div className={`${styles.statusMessage} ${state.success ? styles.success : styles.error}`}>
                {state.message}
              </div>
            )}
          </>
          : <></>}




      </form>
    </div >
  );
};
