import { CartItem } from '../CartItem/CartItem';
import s from '../CartPage.module.css';
import classNames from 'classnames';
import { memo } from 'react';

type CartListProps = {
	products: CartProduct[];
};

const CartListInner = ({ products }: CartListProps) => {
	return (
		<div className={classNames(s['cart-list'])}>
			{products.map((p) => (
				<CartItem product={p} key={p.id} />
			))}
		</div>
	);
};

export const CartList = memo(CartListInner);
CartList.displayName = 'CartList';
