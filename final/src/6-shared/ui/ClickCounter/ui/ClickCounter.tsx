import { FC, useRef, useState } from 'react';
import s from './ClickCounter.module.css';

export const ClickCounter: FC = () => {
	// === useRef для хранения счётчика без перерендера ===
	const clickCountRef = useRef<number>(0);

	const [displayCount, setDisplayCount] = useState<number>(0);

	const handleClick = () => {
		clickCountRef.current += 1;

		// Обновляем state только для отображения (для debounce-примера)
		setDisplayCount(clickCountRef.current);
	};

	const handleShowRealCount = () => {
		alert(`Реальное количество кликов: ${clickCountRef.current}`);
	};

	return (
		<div className={s['counter']}>
			<h3 className={s['counter__title']}>Счётчик кликов</h3>
			<p className={s['counter__text']}>Кликните кнопку и проверьте консоль</p>
			<button className={s['counter__button']} onClick={handleClick}>
				Нажми меня ({displayCount})
			</button>
			<button className={s['counter__button']} onClick={handleShowRealCount}>
				Показать реальное число кликов
			</button>
		</div>
	);
};
