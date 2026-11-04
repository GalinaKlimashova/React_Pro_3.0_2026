import type { ComponentType } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

export const withToastify = (WrappedComponent: ComponentType) => () => (
    <>
        <WrappedComponent />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
        />
    </>
);
