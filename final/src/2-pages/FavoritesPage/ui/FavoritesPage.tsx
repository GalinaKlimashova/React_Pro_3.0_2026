import { useNavigate } from 'react-router-dom';
import { WithQuery } from '@shared/store/HOCs/WithQuery';
import { useProducts } from '@shared/store/hooks/useProducts';
import { cartSelectors } from '@shared/store/slices/cart';
import { useAppSelector } from '@shared/store/utils';
import { Button } from '@shared/ui/Button';
import { CardList } from '@widgets/CardList';
import { useCallback } from 'react';

const CardListWithQuery = WithQuery(CardList);

const FavoritesPageInner = () => {
	const { isLoading, isError, products, error } = useProducts();
	const cartProductIds = useAppSelector(cartSelectors.getCartProductIds);
	const navigate = useNavigate();

	const handleProductClick = useCallback(
		(id: string) => navigate(`/products/${id}`),
		[navigate]
	);

	return (
		<>
			<br />
			<Button variant='back' onClick={() => navigate(-1)} />
			<CardListWithQuery
				title='Избранные'
				isLoading={isLoading}
				isError={isError}
				products={products}
				cartProductIds={cartProductIds}
				error={error}
				onProductClick={handleProductClick}
			/>
		</>
	);
};

export const FavoritesPage = FavoritesPageInner;
