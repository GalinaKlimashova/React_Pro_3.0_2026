import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { userSelectors } from '../slices/user';
import { useAppSelector } from '../utils';
import { productsSelectors } from '../slices/products';
import { useGetProductsQuery } from '../api/productsApi';

export const useProducts = () => {
	const { pathname } = useLocation();

	const { page, perPage, sort, searchText } = useAppSelector(
		productsSelectors.getProductsState
	);

	const isFavoritesPage = pathname === '/favorites';
	const isHomePage = pathname === '/';

	const fetchAll = isHomePage && !isFavoritesPage;

	const { isLoading, isError, error, data, isFetching } = useGetProductsQuery({
		searchText,
		sort,
		page: isFavoritesPage ? 1 : page,
		perPage: isFavoritesPage ? 99999 : fetchAll ? perPage : perPage,
	});

	const productIdsRef = useRef(new Set<string>());
	const [accumulatedProducts, setAccumulatedProducts] = useState<Product[]>([]);
	const lastProductIdRef = useRef('');

	const likedProductIds = useAppSelector(userSelectors.getLikedProductIds);

	const allProductsFromApi = useMemo(() => data?.products || [], [data]);
	const productsCount = data?.length || 0;

	useEffect(() => {
		if (!allProductsFromApi.length) return;

		const currentIdList = allProductsFromApi.map((p) => p.id).join(',');
		if (currentIdList === lastProductIdRef.current) return;
		lastProductIdRef.current = currentIdList;

		if (isFavoritesPage) {
			const filtered = allProductsFromApi.filter((p) =>
				likedProductIds.includes(p.id)
			);
			setAccumulatedProducts(filtered);
			productIdsRef.current.clear();
			filtered.forEach((p) => productIdsRef.current.add(p.id));
		} else if (page === 1) {
			setAccumulatedProducts(allProductsFromApi);
			productIdsRef.current.clear();
			allProductsFromApi.forEach((p) => productIdsRef.current.add(p.id));
		} else {
			const newProducts = allProductsFromApi.filter(
				(p) => !productIdsRef.current.has(p.id)
			);
			if (newProducts.length > 0) {
				setAccumulatedProducts((prev) => [...prev, ...newProducts]);
				newProducts.forEach((p) => productIdsRef.current.add(p.id));
			}
		}
	}, [allProductsFromApi, page, isFavoritesPage, likedProductIds]);

	const filteredProducts = useMemo(() => {
		return accumulatedProducts;
	}, [accumulatedProducts]);

	return {
		products: filteredProducts,
		isLoading,
		isError,
		isFetching,
		error,
		productsCount,
	};
};
