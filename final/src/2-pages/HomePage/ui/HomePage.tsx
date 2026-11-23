import { WithQuery } from '@shared/store/HOCs/WithQuery';
import { CardList } from '@widgets/CardList';
import { Loader } from '@shared/ui/Loader';
import { useProducts } from '@shared/store/hooks/useProducts';
import { useLoadMore } from '@shared/store/hooks/useLoadMore';
import { useAppSelector } from '@shared/store/utils';
import { cartSelectors } from '@shared/store/slices/cart';
import { useNavigate } from 'react-router-dom';

import { useCallback } from 'react';

const CardListWithQuery = WithQuery(CardList);

const HomePageInner = () => {
	const { products, isLoading, isError, error, isFetching, productsCount } =
		useProducts();
	const cartProductIds = useAppSelector(cartSelectors.getCartProductIds);
	const navigate = useNavigate();

	const handleProductClick = useCallback(
		(id: string) => navigate(`/products/${id}`),
		[navigate]
	);

	const displayedCount = products.length;
	const isEndOfList = displayedCount >= productsCount;

	useLoadMore(isFetching, isEndOfList);

	return (
		<>
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
				cartProductIds={cartProductIds}
				onProductClick={handleProductClick}
			/>
			{!isEndOfList && isFetching && (
				<div style={{ textAlign: 'center', padding: '20px' }}>
					<Loader />
				</div>
			)}
			{isEndOfList && productsCount > 0 && (
				<p style={{ textAlign: 'center', padding: '20px' }}>Список завершён</p>
			)}
		</>
	);
};

export const HomePage = HomePageInner;
