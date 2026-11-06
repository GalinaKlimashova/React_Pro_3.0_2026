import { FC, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import s from './Modal.module.css';

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
	const closeRef = useRef<HTMLButtonElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	let triggerElement: HTMLElement | null = null;

	// Сохраняем элемент-триггер при открытии
	useEffect(() => {
		if (!isOpen) return;

		triggerElement = document.activeElement as HTMLElement;

		// Фокус на кнопку закрытия
		closeRef.current?.focus();

		// Обработчик ESC
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		// Обработчик клика вне области модалки
		const handleClickOutside = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEsc);
		document.addEventListener('mousedown', handleClickOutside);

		// Блокируем скролл body
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.removeEventListener('mousedown', handleClickOutside);
			document.body.style.overflow = '';

			// Возвращаем фокус на триггер
			triggerElement?.focus();
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return ReactDOM.createPortal(
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
		document.getElementById('modal-root')!
	);
};
