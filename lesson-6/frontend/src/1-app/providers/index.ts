import { compose } from '6-shared/lib/compose';

import { withAuthContext } from './Auth';
import { withTheme } from './MUI';
import { withReactDayPicker } from './ReactDayPicker';
import { withTanStackQuery } from './TanStackQuery';
import { withToastify } from './Toastify';

export const withProviders = compose(withAuthContext, withTheme, withToastify, withTanStackQuery, withReactDayPicker);
