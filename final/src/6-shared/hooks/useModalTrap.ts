import { useEffect, useCallback } from 'react';

export const useModalTrap = (
	isOpen: boolean,
	onClose: () => void,
	triggerRef?: React.RefObject<HTMLElement | null>,
	closeRef?: React.RefObject<HTMLElement | null>
) => {
	const handleEsc = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		if (!isOpen) return;

		closeRef?.current?.focus();

		document.addEventListener('keydown', handleEsc);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.body.style.overflow = '';
		};
	}, [isOpen, onClose, closeRef, handleEsc]);
};
