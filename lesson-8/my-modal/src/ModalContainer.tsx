import type { FC } from 'react';
import { DATA_ATTR_NAME, PARENT_ELEMENT } from './configs.ts';
import { getModalContainer } from './utils.ts';

export const ModalContainer: FC = () => {
    const modalParentElement = document.createElement(PARENT_ELEMENT);
    modalParentElement.dataset.type = DATA_ATTR_NAME;

    if (!getModalContainer()) document.body.insertAdjacentElement('beforeend', modalParentElement);

    return null;
};
