import { FC, useState } from 'react';
import classNames from 'classnames';
import s from './ReviewForm.module.css';
import { Rating } from '@shared/ui/Rating';
import { Button } from '@shared/ui/Button';

export interface ReviewFormProps {
	isPending?: boolean;
	onSubmit?: (text: string, rating: number) => void;
}

export const ReviewForm: FC<ReviewFormProps> = ({ isPending, onSubmit }) => {
	const [rating, setRating] = useState(0);
	const [submitError, setSubmitError] = useState('');
	const [text, setText] = useState('');

	const handleRatingChange = (newRating: number) => {
		setRating(newRating);
		setSubmitError('');
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!rating || rating < 1 || rating > 5) {
			setSubmitError('Укажите оценку');
			return;
		}

		if (!text.trim()) {
			setSubmitError('Текст отзыва не может быть пустым');
			return;
		}

		setSubmitError('');
		onSubmit?.(text, rating);
	};

	return (
		<form className={s['form']} onSubmit={handleSubmit}>
			<Rating isEdit rating={rating} onChange={handleRatingChange} />
			<textarea
				className={classNames(s['input'], s['textarea'])}
				name='text'
				id='text'
				placeholder='Напишите текст отзыва'
				required
				rows={4}
				value={text}
				onChange={(e) => setText(e.target.value)}></textarea>
			{submitError && <p className={s['form__error']}>{submitError}</p>}
			<Button
				type='submit'
				className={classNames(s['form__btn'], s['pramary'])}
				title={isPending ? 'Отправка...' : 'Отправить отзыв'}
				disabled={isPending}></Button>
		</form>
	);
};
