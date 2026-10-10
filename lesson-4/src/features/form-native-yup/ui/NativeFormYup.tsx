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
  submitButtonType,
  usernameField,
  usernameLabel,
  usernamePlaseholder
} from "@shared/constants";
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
import styles from "@shared/css-files/NativeForm.module.css";
import { getMiddlewareStep } from "@shared/utils/getMiddlwareStep";
import { getFinalStep } from "@shared/utils/getFinalStep";
import { getCongratulation } from "@shared/utils/getCongratulation";

export const NativeFormYup = () => {
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
          ? getMiddlewareStep(firstStepContent)
          : <></>
        }
        {/* предпоследний шаг */}
        {step === (MAX_STEPS_COUNT - 1)
          ? getFinalStep({
            username: currentUserName,
            contactEmail: email
          })
          : <></>}
        {/* финальное заключение */}
        {step === MAX_STEPS_COUNT && state.success
          ? getCongratulation({
            username: currentUserName,
            contactEmail: email
          })
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
        {/* Кнопка отправки */}
        {step !== MAX_STEPS_COUNT
          ? <button
            type={submitButtonType}
            disabled={isPending}
            className={styles.submitBtn}>
            {isPending
              ? <span className={styles.spinner}></span>
              : nextButton}
          </button>
          : <></>}

        {/* Общий статус ответа от сервера */}
        {state.message && !isPending && (
          <div className={`${styles.statusMessage} ${state.success ? styles.success : styles.error}`}>
            {state.message}
          </div>
        )}
      </form>
    </div >
  );
};
