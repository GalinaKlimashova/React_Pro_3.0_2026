import { useState, ChangeEvent, useCallback } from 'react';
import classNames from 'classnames';
import s from './ReviewForm.module.css';
import { Rating } from '@shared/ui/Rating';
import { Textarea } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';

export const ReviewForm = () => {
	const [reviewText, setReviewText] = useState('');
	const [rating, setRating] = useState(0);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setReviewText(e.target.value);
	};

	const handleClick = useCallback(() => {
		console.log('Отправка: ', { reviewText, rating });
	}, [reviewText, rating]);

	return (
		<form className={s['form']}>
			<Rating isEdit rating={rating} onChange={setRating} />
			<Textarea
				className={classNames(s['input'], s['textarea'])}
				name='text'
				id='text'
				placeholder='Напишите текст отзыва'
				value={reviewText}
				onChange={handleChange}></Textarea>
			<Button
				type='submit'
				className={classNames(s['form__btn'], s['pramary'])}
				onClick={handleClick}>
				Отправить отзыв
			</Button>
		</form>
	);
};
