import { Card } from '@shared/ui/Card';
import s from './CardList.module.css';
import { memo } from 'react';

type CardListProps = {
	title: string;
	products: Product[];
};
export const CardList = memo<CardListProps>(({ title, products }) => {
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
					<Card key={product.id} product={product} />
				))}
			</div>
		</div>
	);
});
CardList.displayName = 'CardList';
