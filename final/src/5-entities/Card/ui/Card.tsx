import { memo, useCallback } from 'react';
import classNames from 'classnames';
import s from './Card.module.css';
import { Price } from '@shared/ui/Price/index';
import { Button } from '@shared/ui/Button';
import { LikeButton } from '@features/likeButton';

export type CardProps = {
	product: Product;
	isInCart: boolean;
	onProductClick?: (productId: string) => void;
	onAddToCart?: (product: Product) => void;
};

export const Card = memo<CardProps>(
	({ product, isInCart, onProductClick, onAddToCart }) => {
		const { discount, price, name, tags, id, images } = product;

		const handleCardClick = useCallback(() => {
			onProductClick?.(id);
		}, [onProductClick, id]);

		const handleAddToCart = useCallback(
			(e: React.MouseEvent) => {
				e.stopPropagation();
				if (!isInCart && onAddToCart) {
					onAddToCart(product);
				}
			},
			[onAddToCart, isInCart, product]
		);

		return (
			<article className={s['card']}>
				<div
					className={classNames(
						s['card__sticky'],
						s['card__sticky_type_top-left']
					)}>
					{discount !== undefined && discount > 0 && (
						<span className={s['card__discount']}>{`${discount}₽`}</span>
					)}
					{tags.length > 0 &&
						tags.map((t) => (
							<span key={t} className={classNames(s['tag'], s['tag_type_new'])}>
								{t}
							</span>
						))}
				</div>
				<div
					className={classNames(
						s['card__sticky'],
						s['card__sticky_type_top-right']
					)}>
					<LikeButton product={product} />
				</div>
				<button
					type='button'
					onClick={handleCardClick}
					className={s['card__link']}>
					<img
						src={images}
						alt={name}
						className={s['card__image']}
						loading='lazy'
					/>
					<div className={s['card__desc']}>
						<Price price={price} discountPrice={discount ?? 0} />
						<h3 className={s['card__name']}>{name}</h3>
					</div>
				</button>
				{isInCart ? (
					<Button
						disabled
						title={'В корзине'}
						className={classNames(
							s['card__cart'],
							s['card__btn'],
							s['isInBtn'],
							s['card__btn_type_primary']
						)}></Button>
				) : (
					<Button
						type='button'
						onClick={handleAddToCart}
						className={classNames(
							s['card__cart'],
							s['card__btn'],
							s['card__btn_type_primary']
						)}
						title={'В корзину'}></Button>
				)}
			</article>
		);
	}
);
Card.displayName = 'Card';
