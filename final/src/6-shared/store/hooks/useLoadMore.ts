import { useEffect, useCallback, useRef } from 'react';
import { productsActions } from '@shared/store/slices/products';
import { useAppDispatch } from '@shared/store/utils';

export const useLoadMore = (isFetching: boolean, isEndOfList: boolean) => {
	const dispatch = useAppDispatch();
	const checkedRef = useRef(false);

	const handleScroll = useCallback(() => {
		if (!checkedRef.current) {
			const { scrollTop, clientHeight, scrollHeight } =
				document.documentElement;
			const atBottom = scrollHeight - scrollTop - clientHeight < 200;

			if (atBottom && !isFetching && !isEndOfList) {
				console.log('Scroll trigger → load more');
				dispatch(productsActions.incrementPage());
				checkedRef.current = true;
			}
		}
	}, [isFetching, isEndOfList, dispatch]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	useEffect(() => {
		if (!isFetching) {
			checkedRef.current = false;
		}
	}, [isFetching]);

	return null;
};
