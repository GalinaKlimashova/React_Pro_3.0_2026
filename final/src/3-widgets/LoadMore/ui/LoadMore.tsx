import { memo } from 'react';
import { Loader } from '@shared/ui/Loader';
import s from './LoadMore.module.css';

type LoadMoreProps = {
	isFetching: boolean;
	isEndOfList: boolean;
	onLoadMore: () => void;
};

export const LoadMore = memo(
	({ isFetching, isEndOfList, onLoadMore }: LoadMoreProps) => {
		if (isEndOfList) {
			return <p className={s['load-more-end']}>Список завершён</p>;
		}

		return (
			<div className={s['load-more']}>
				{isFetching ? (
					<Loader />
				) : (
					<button
						className={s['load-more-button']}
						onClick={onLoadMore}
						disabled={!onLoadMore}>
						Показать ещё
					</button>
				)}
			</div>
		);
	}
);
LoadMore.displayName = 'LoadMore';
