import s from './ProductCartCounter.module.css';
import classNames from 'classnames';
import { useCallback, useState, memo } from 'react';
import { Button } from '@shared/ui/Button';

export type ProductCartCounterProps = {
	product: Product;
	onAddToCart: (product: CartProduct) => void;
};

const MIN_COUNT = 1;
const MAX_COUNT = 99;

const ProductCartCounterInner = ({
	product,
	onAddToCart,
}: ProductCartCounterProps) => {
	const [inputValue, setInputValue] = useState(1);

	const handleDecrement = useCallback(() => {
		setInputValue((prev) => Math.max(MIN_COUNT, prev - 1));
	}, []);

	const handleIncrement = useCallback(() => {
		setInputValue((prev) => Math.min(MAX_COUNT, prev + 1));
	}, []);

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const val = parseInt(e.target.value, 10);
		setInputValue(
			isNaN(val) ? MIN_COUNT : Math.min(MAX_COUNT, Math.max(MIN_COUNT, val))
		);
	}, []);

	const handleAddToCart = useCallback(() => {
		onAddToCart({ ...product, count: inputValue });
	}, [product, inputValue, onAddToCart]);

	return (
		<div className={classNames('product__btn-wrap')}>
			<div className={s['button-count']}>
				<Button
					className={s['button-count__minus']}
					type='button'
					onClick={handleDecrement}
					title='-'></Button>
				<input
					type='number'
					className={s['button-count__num']}
					value={inputValue}
					onChange={handleChange}
				/>
				<Button
					className={s['button-count__plus']}
					type='button'
					onClick={handleIncrement}
					title='+'></Button>
			</div>
			<Button onClick={handleAddToCart} title='В корзину'></Button>
		</div>
	);
};

export const ProductCartCounter = memo(ProductCartCounterInner);
ProductCartCounter.displayName = 'ProductCartCounter';
