import s from './CartCounter.module.css';
import classNames from 'classnames';
import { useCount } from '../hooks/useCount';
import { Button } from '@shared/ui/Button';

type TCartCounter = {
	productId: string;
};
export const CartCounter = ({ productId }: TCartCounter) => {
	const { count, stock, handleSetCount, handleIncrement, handleDecrement } =
		useCount(productId);

	return (
		<div className={classNames(s['button-count'])}>
			<Button
				type='button'
				onClick={handleDecrement}
				className={classNames(s['button-count__minus'])}
				disabled={count <= 1}
				title='-'></Button>
			<input
				onChange={handleSetCount}
				type='number'
				className={classNames(s['button-count__num'])}
				value={count}
			/>
			<Button
				type='button'
				onClick={handleIncrement}
				className={classNames(s['button-count__plus'])}
				disabled={count >= stock}
				title='+'></Button>
		</div>
	);
};
