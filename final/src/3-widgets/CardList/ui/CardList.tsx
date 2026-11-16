import { memo, useCallback } from 'react';
import s from './CardList.module.css';
import { cartActions } from '@shared/store/slices/cart';
import { useAppDispatch } from '@shared/store/utils';
import { Card } from '../../../5-entities/Card';

type CardListProps = {
	title: string;
	products: Product[];
	cartProductIds?: string[];
	onProductClick?: (productId: string) => void;
};

export const CardList = memo(function CardList({
	title,
	products,
	cartProductIds = [],
	onProductClick,
}: CardListProps) {
	const dispatch = useAppDispatch();

	const handleAddToCart = useCallback(
		(product: Product) => {
			dispatch(cartActions.addCartProduct({ ...product, count: 1 }));
		},
		[dispatch]
	);

	if (!products.length) {
		return <h1 className='header-title'>Товар не найден</h1>;
	}

	return (
		<div className={s['card-list']}>
			<div className={s['card-list__header']}>
				<h2 className={s['card-list__title']}>{title}</h2>
			</div>
			<div className={s['card-list__items']}>
				{products.map((product) => (
					<div className={s['card-list__item']} key={product.id}>
						<Card
							product={product}
							isInCart={cartProductIds.includes(product.id)}
							onProductClick={onProductClick}
							onAddToCart={handleAddToCart}
						/>
					</div>
				))}
			</div>
		</div>
	);
});
