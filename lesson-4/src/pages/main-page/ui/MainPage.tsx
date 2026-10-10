import { useState } from 'react';
import { Tabs } from '@shared/ui';
import { FormikForm } from '@features/form-formik/ui/FormikForm';
import { RhfForm } from '@features/form-rhf/ui/RhfForm';
import { NativeForm } from '@features/form-native/ui/NativeForm';
import styles from './MainPage.module.css';

const TABS = [
  { id: 'formik', label: 'Formik + Field Arrays + Yup' },
  { id: 'rhf', label: 'RHF + Field Arrays + Zod' },
  { id: 'native', label: 'React 19 useActionState' },
];

export const MainPage = () => {
  const [activeTab, setActiveTab] = useState('formik');

  const renderForm = () => {
    switch (activeTab) {
      case 'formik':
        return <FormikForm />;
      case 'rhf':
        return <RhfForm />;
      case 'native':
        return <NativeForm />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h1>Формы в React</h1>
      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <div className={styles.formContainer}>
        {renderForm()}
      </div>
    </div>
  );
};