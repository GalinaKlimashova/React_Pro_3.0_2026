import classNames from 'classnames';
import s from './Price.module.css';
import { memo } from 'react';

type TPriceProps = {
	price: number;
	discountPrice?: number;
};

const PriceInner = ({ price, discountPrice }: TPriceProps) => {
	return (
		<div className={classNames(s['price-small'], s['price-wrap'])}>
			{discountPrice !== undefined && discountPrice > 0 && (
				<>
					<span className={classNames(s['price_old'], s['price_left'])}>
						{`${price}₽`}
					</span>
					<span className={classNames(s['price_discount'], s['price'])}>
						{`${price - discountPrice}₽`}
					</span>
				</>
			)}
			{!(discountPrice !== undefined && discountPrice > 0) && (
				<span className={s['price']}>{`${price}₽`}</span>
			)}
		</div>
	);
};

export const Price = memo(PriceInner);
Price.displayName = 'Price';
