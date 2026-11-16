import { RefObject, useCallback, useLayoutEffect } from 'react';

interface UseLoadMoreParams {
	ref: RefObject<HTMLDivElement | null>;
	isFetching: boolean;
	isEndOfList: boolean;
	onLoadMore: () => void;
	fetchedCount: number;
}

export const useLoadMore = ({
	ref,
	isFetching,
	isEndOfList,
	onLoadMore,
	fetchedCount,
}: UseLoadMoreParams) => {
	const fetchMoreProducts = useCallback(() => {
		if (!isEndOfList && !isFetching) {
			onLoadMore();
		}
	}, [isEndOfList, isFetching, onLoadMore]);

	useLayoutEffect(() => {
		let observer: IntersectionObserver | undefined = undefined;

		if (!isEndOfList && fetchedCount > 0) {
			const options: IntersectionObserverInit = { threshold: 0.5 };
			const callback: IntersectionObserverCallback = (entries) => {
				if (entries[0].isIntersecting) {
					fetchMoreProducts();
				}
			};
			observer = new IntersectionObserver(callback, options);
			ref.current && observer.observe(ref.current);
		}

		return () => {
			observer?.disconnect();
		};
	}, [fetchMoreProducts, isEndOfList, fetchedCount, ref]);
};
