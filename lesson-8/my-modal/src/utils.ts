import { DATA_ATTR_NAME } from './configs.ts';

export const getModalContainer = () => document.querySelector(`[data-type=${DATA_ATTR_NAME}]`);
