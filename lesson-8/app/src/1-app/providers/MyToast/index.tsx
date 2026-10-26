import { MyToastContainer } from '@zh2s/my-toast';
import type { ComponentType } from 'react';

export const withMyToast = (WrappedComponent: ComponentType) => () => (
    <>
        <WrappedComponent />
        <MyToastContainer position="top-right" />
    </>
);
