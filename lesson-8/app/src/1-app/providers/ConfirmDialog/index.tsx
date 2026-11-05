import type { ComponentType } from 'react';
import { ConfirmDialogProvider } from '6-shared/ui/ConfirmDialog';

import type { UseConfirmDialogResult } from '6-shared/ui/ConfirmDialog';
import { ConfirmDialogContainer } from './ConfirmDialogContainer';

export const withConfirmDialog = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const Component = (props: P) => (
        <>
            <ConfirmDialogProvider>
                <WrappedComponent {...props} />
            </ConfirmDialogProvider>
            <ConfirmDialogContainer />
        </>
    );
    return Component as unknown as ComponentType<P>;
};

export type { UseConfirmDialogResult };
