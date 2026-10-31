import { compose } from '6-shared/lib/compose';

import { withAuthContext } from './Auth';
import { withConfirmDialog } from './ConfirmDialog';
import { withMUITheme } from './MUI';
import { withMyToast } from './MyToast';
import { withReactDayPicker } from './ReactDayPicker';
import { withTanStackQuery } from './TanStackQuery';
import { withToastify } from './Toastify';
import { withTooltip } from './Tooltip';

export const withProviders = compose(
    withMUITheme,
    withAuthContext,
    withMyToast,
    withToastify,
    withTanStackQuery,
    withReactDayPicker,
    withTooltip,
    withConfirmDialog,
);
