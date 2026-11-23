import { ChangeEvent } from 'react';
import { cartActions, cartSelectors } from '@shared/store/slices/cart';
import { useAppDispatch, useAppSelector } from '@shared/store/utils';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

export const useCount = (productId: string) => {
	const dispatch = useAppDispatch();
	const products = useAppSelector(cartSelectors.getCartProducts);
	const product = products.find((p) => p.id === productId) as
		| CartProduct
		| undefined;

	const countValue = product?.count ?? MIN_COUNT;
	const stock = product?.stock ?? MAX_COUNT;
	const id = product?.id;

	const handleIncrement = () => {
		if (!id) return;
		const newCount = countValue + 1;
		const validCount = newCount > MAX_COUNT ? MAX_COUNT : newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	};
	const handleDecrement = () => {
		if (!id) return;
		const newCount = countValue - 1;
		const validCount = newCount < MIN_COUNT ? MIN_COUNT : newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	};
	const handleSetCount = (e: ChangeEvent<HTMLInputElement>) => {
		if (!id) return;
		const newCount = +e.target.value;
		const validCount =
			newCount > MAX_COUNT
				? MAX_COUNT
				: newCount < MIN_COUNT
				? MIN_COUNT
				: newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	};
	return {
		count: countValue,
		stock,
		handleSetCount,
		handleIncrement,
		handleDecrement,
	};
};
