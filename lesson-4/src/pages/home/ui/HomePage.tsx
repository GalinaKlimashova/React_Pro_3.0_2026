import { useState } from 'react';

import { FormikForm } from '@features/form-formik';
import { NativeForm } from '@features/form-native/ui/NativeForm';
import { RhfForm } from '@features/form-rhf';
import { formikTabTitle, formMainTitle, nativeTabTitle, nativeYup, rhfTabTitle } from '@shared/constants';
import { Tabs } from '@shared/ui';
import afl from '../../../assets/aeroflot.svg';
import styles from './HomePage.module.css';
import { NativeFormYup } from '@features/form-native-yup';

const TABS = [
  { id: formikTabTitle, label: 'Formik + Field Arrays + Yup' },
  { id: rhfTabTitle, label: 'RHF + fields + Zod' },
  { id: nativeTabTitle, label: 'React 19 useActionState + Zod' },
  { id: nativeYup, label: 'React 19 useActionState + Yup' },

];

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState(formikTabTitle);

  const renderForm = () => {
    switch (activeTab) {
      case formikTabTitle:
        return <FormikForm />;
      case rhfTabTitle:
        return <RhfForm />;
      case nativeTabTitle:
        return <NativeForm />;
      case nativeYup:
        return <NativeFormYup />
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div><img className={styles.aflIcon} src={afl} /></div>
      <h1>{formMainTitle}</h1>
      <Tabs tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab} />
      <div className={styles.formContainer}>
        {renderForm()}
      </div>
    </div>
  );
};