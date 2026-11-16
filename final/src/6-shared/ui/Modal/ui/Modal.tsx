import { createPortal } from 'react-dom';
import s from './Modal.module.css';

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	/** Ref на корневой элемент модального окна */
	modalRef?: React.RefObject<HTMLDivElement | null>;
	/** Ref на кнопку закрытия */
	closeRef?: React.RefObject<HTMLButtonElement | null>;
}

export const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	modalRef,
	closeRef,
}: ModalProps) => {
	if (!isOpen) return null;

	const modalRoot = document.getElementById('modal-root');
	if (!modalRoot) return null;

	return createPortal(
		<div className={s['overlay']} role='presentation'>
			<div className={s['modal']} ref={modalRef}>
				{title && <h2 className={s['modal__title']}>{title}</h2>}
				<button
					className={s['modal__close']}
					ref={closeRef}
					onClick={onClose}
					aria-label='Закрыть'>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M15 5L5 15M5 5L15 15'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
				<div className={s['modal__content']}>{children}</div>
			</div>
		</div>,
		modalRoot
	);
};
