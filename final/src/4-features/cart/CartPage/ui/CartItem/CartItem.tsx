import TrashIcon from '@shared/assets/icons/trash.svg?url';
import { Link } from 'react-router-dom';
import s from '../../../CartPage/ui/CartPage.module.css';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { cartActions } from '@shared/store/slices/cart';
import { CartCounter } from '../../../ui/CartCounter';
import { memo, useCallback, useMemo } from 'react';
import type { CSSProperties } from 'react';

type CartItemProps = {
	product: CartProduct;
};
export const CartItem = memo(CartItemInner);

function CartItemInner({ product }: CartItemProps) {
	const dispatch = useDispatch();
	const { id, name, images, price, discount } = product;

	const handleDelete = useCallback(() => {
		dispatch(cartActions.deleteCartProduct(id));
	}, [dispatch, id]);

	const columnStyle = useMemo<CSSProperties>(
		() => ({ display: 'flex', flexDirection: 'column', flexGrow: 1 }),
		[]
	);
	const rowStyle = useMemo<CSSProperties>(
		() => ({ display: 'flex', gap: '20px', flexGrow: 1 }),
		[]
	);

	return (
		<div className={classNames(s['cart-item'])}>
			<div className={classNames(s['cart-item__desc'])}>
				<img
					src={images}
					alt={name}
					className={classNames(s['cart-item__image'])}
				/>

				<div style={columnStyle}>
					<div style={rowStyle}>
						<Link
							className={classNames(s['cart-item__title'])}
							to={`/products/${id}`}>
							<h2>{name}</h2>
						</Link>

						<div>
							<CartCounter productId={id} />

							<div className={classNames(s['cart-item__price'])}>
								<div className={classNames(s['price-big'], s['price-wrap'])}>
									<span
										className={classNames(s['price_old'], s['price_right'])}>
										{price}
									</span>
									<span className={classNames(s['price_discount'], s['price'])}>
										{price - discount}
									</span>
								</div>
							</div>
						</div>
						<button
							className={classNames(s['cart-item__bnt-trash'])}
							onClick={handleDelete}
							aria-label='Удалить товар'>
							<img
								src={TrashIcon}
								alt='delete'
								style={{ width: 24, height: 24, cursor: 'pointer' }}
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
