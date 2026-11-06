import { ReactComponent as TrashIcon } from '@shared/assets/icons/trash.svg';
import { Link } from 'react-router-dom';
import s from '../../CartPage.module.css';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import {
	cartActions,
	cartSelectors,
} from '@shared/store/slices/cart';
import { CartCounter } from '@shared/ui/CartCounter';
import { memo, useCallback } from 'react';
import { useAppSelector } from '@shared/store/utils';
import type { CSSProperties } from 'react';

type CartItemProps = {
	product: CartProduct;
};
export const CartItem = memo(CartItemInner);

function CartItemInner({ product }: CartItemProps) {
	const dispatch = useDispatch();
	const cartProducts = useAppSelector(cartSelectors.getCartProducts);
	const { id, name, images, price, discount } = product;
	const isProductInCart = cartProducts.some((p) => p.id === id);

	const handleDelete = useCallback(() => {
		dispatch(cartActions.deleteCartProduct(id));
	}, [dispatch, id]);

	const columnStyle: CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
	};
	const rowStyle: CSSProperties = { display: 'flex', gap: '20px', flexGrow: 1 };

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
							{isProductInCart ? <CartCounter productId={id} /> : null}

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
						<button className={classNames(s['cart-item__bnt-trash'])}>
							<TrashIcon onClick={handleDelete} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
