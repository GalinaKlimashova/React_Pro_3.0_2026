import type { ComponentType } from 'react';

import { TooltipContainer } from './TooltipContainer';

export const withTooltip = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const Component = (props: P) => (
        <>
            <WrappedComponent {...props} />
            <TooltipContainer />
        </>
    );
    return Component as unknown as ComponentType<P>;
};
