import { productsActions } from '@shared/store/slices/products';
import { useAppDispatch, useAppSelector } from '@shared/store/utils';
import { ChangeEvent, memo, useCallback, useMemo } from 'react';
import styles from './Sort.module.css';
interface SortParam {
	title: string;
	value: Sort;
	href: string;
}

const SORT_PARAMS_INIT: SortParam[] = [
	{ title: 'Все', value: 'all', href: '#' },
	{ title: 'Дешевые', value: 'low-price', href: '#' },
	{ title: 'Дорогие', value: 'high-price', href: '#' },
	{ title: 'Новые', value: 'newest', href: '#' },
	{ title: 'Старые', value: 'oldest', href: '#' },
];

const SortInner = () => {
	const dispatch = useAppDispatch();
	const sort = useAppSelector((state) => state.products?.sort || 'all');

	const sortParams = useMemo(() => SORT_PARAMS_INIT, []);

	const handleSortSelect = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			dispatch(productsActions.setSort(e.target.value as Sort));
			if (e.target.value === 'all') {
				dispatch(productsActions.setRefresh());
			}
		},
		[dispatch]
	);

	return (
		<select className={styles.sort} value={sort} onChange={handleSortSelect}>
			{sortParams.map((p) => (
				<option key={p.title} value={p.value}>
					{p.title}
				</option>
			))}
		</select>
	);
};

export const Sort = memo(SortInner);
Sort.displayName = 'Sort';
