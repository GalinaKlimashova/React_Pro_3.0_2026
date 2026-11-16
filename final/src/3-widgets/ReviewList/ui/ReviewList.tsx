import classNames from 'classnames';
import s from './ReviewList.module.css';
import { Rating } from '@shared/ui/Rating';
import { ReviewForm } from './ReviewForm/ReviewForm';
import { useMemo, useState, useRef } from 'react';
import { Button } from '@shared/ui/Button';
import { Modal } from '@shared/ui/Modal';
import { useModalTrap } from '@shared/hooks/useModalTrap';

type ReviewListProps = {
	product: Product;
};

const REVIEWS_INITIAL_COUNT = 3;

const ReviewListInner = ({ product }: ReviewListProps) => {
	const [visibleCount, setVisibleCount] = useState(REVIEWS_INITIAL_COUNT);
	const closeRef = useRef<HTMLButtonElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

	useModalTrap(
		isReviewModalOpen,
		() => setIsReviewModalOpen(false),
		undefined as unknown as React.RefObject<HTMLElement | null>,
		closeRef
	);

	const [reviewsState, setReviewsState] = useState<Review[]>(product.reviews);

	const [optimisticReviews, setOptimisticReviews] =
		useState<Review[]>(reviewsState);

	const reviewsWithDate = useMemo(
		() =>
			optimisticReviews.map((review) => ({
				...review,
				formattedDate: new Date(review.createdAt).toLocaleDateString('ru-RU'),
			})),
		[optimisticReviews]
	);

	const visibleReviews = reviewsWithDate.slice(0, visibleCount);
	const hasMore = visibleCount < optimisticReviews.length;

	const handleLoadMore = () => {
		setVisibleCount((prev) => prev + REVIEWS_INITIAL_COUNT);
	};

	const handleSubmitReview = (reviewText: string, ratingValue: number) => {
		if (
			!reviewText.trim() ||
			!ratingValue ||
			ratingValue < 1 ||
			ratingValue > 5
		) {
			return;
		}

		const newReview: Review = {
			id: crypto.randomUUID(),
			user: {
				id: 'current-user',
				roles: ['USER'],
				name: 'Вы',
				email: '',
				phone: '',
				avatarPath: '',
				about: '',
				likes: [],
				favoritesPost: [],
			} as User,
			text: reviewText,
			rating: ratingValue,
			product: { id: product.id } as ReviewProduct,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		setOptimisticReviews((prev) => [...prev, newReview]);

		setTimeout(() => {
			setReviewsState((prev) => [...prev, newReview]);
			setIsReviewModalOpen(false);
		}, 800);
	};

	return (
		<div className={classNames(s['product__reviews'])}>
			{visibleReviews.map((review) => (
				<div className={s['review']} key={review.id}>
					<div className={s['review__header']}>
						<div className={s['review__name']}>{review.user.name}</div>
						<div className={s['review__date']}>{review.formattedDate}</div>
					</div>
					<Rating rating={review.rating} />
					<p className={s['review__text']}>{review.text}</p>
				</div>
			))}

			{hasMore && (
				<Button
					variant='primary'
					className={s['show-more-btn']}
					onClick={handleLoadMore}
					title='Показать ещё'></Button>
			)}

			<Button
				ref={closeRef}
				className={s['modal-trigger']}
				variant='primary'
				title='Написать отзыв'
				onClick={() => setIsReviewModalOpen(true)}
				style={{ marginTop: '1rem', marginBottom: '1rem' }}></Button>
			<Modal
				isOpen={isReviewModalOpen}
				onClose={() => setIsReviewModalOpen(false)}
				modalRef={modalRef}
				closeRef={closeRef}
				title={`Отзыв о товаре «${product.name}»`}>
				<ReviewForm onSubmit={handleSubmitReview} />
			</Modal>
		</div>
	);
};

export const ReviewList = ReviewListInner;
