// import { MyToastContainer } from '@zh2s/my-toast';
import type { ComponentType, FC } from 'react';

export const withMyToast = (WrappedComponent: ComponentType): FC => {
    const Component: FC = () => (
        <>
            <WrappedComponent />
            {/* <MyToastContainer position="top-right" /> */}
        </>
    );
    return Component;
};
