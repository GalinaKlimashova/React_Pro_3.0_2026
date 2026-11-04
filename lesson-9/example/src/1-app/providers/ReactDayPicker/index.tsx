import type { ComponentType } from 'react';
import 'react-day-picker/style.css';

export const withReactDayPicker = (WrappedComponent: ComponentType) => () => <WrappedComponent />;
