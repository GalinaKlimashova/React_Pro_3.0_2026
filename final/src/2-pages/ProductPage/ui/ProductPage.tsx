import { CartCounter } from '@features/cart/ui/CartCounter';
import { ProductCartCounter } from '@features/cart/ui/ProductCartCounter';
import { LikeButton } from '@features/likeButton';
import QualitySvg from '@shared/assets/icons/quality.svg?url';
import TruckSvg from '@shared/assets/icons/truck.svg?url';
import { useGetProductQuery } from '@shared/store/api/productsApi';
import { cartActions, cartSelectors } from '@shared/store/slices/cart';
import { useAppDispatch, useAppSelector } from '@shared/store/utils';
import { Button } from '@shared/ui/Button';
import { Rating } from '@shared/ui/Rating';
import { ReviewList } from '@widgets/ReviewList/ui/ReviewList';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import s from './ProductPage.module.css';

const ProductPageInner = () => {
	const { productId } = useParams<{ productId: string }>();

	const cartProducts = useAppSelector(cartSelectors.getCartProducts);

	const { data: product } = useGetProductQuery({ id: productId || '' });

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	if (!product) {
		return <></>;
	}

	const { id, name, images, description, price, discount } = product;

	const isProductInCart = !!cartProducts.find((p) => p.id === id);

	return (
		<>
			<div className={classNames(s['product-header-title-container'])}>
				<Button variant='back' onClick={() => navigate(-1)} />
				<h1 className={classNames(s['header-title'])}>{name}</h1>
				<p className='acticul'>
					Артикул: <b>2388907</b>
				</p>
				<Rating rating={3} />
			</div>
			<div className={classNames(s['product'])}>
				<div>
					<img src={images} alt={description} />
				</div>
				<div className={classNames(s['product__desc'])}>
					<div className={classNames(s['price-big'], s['price-wrap'])}>
						{discount > 0 ? (
							<>
								<span className={classNames(s['price_old'], s['price_left'])}>
									{`${price} ₽`}
								</span>
								<span className={classNames(s['price_discount'], s['price'])}>
									{`${price - discount} ₽`}
								</span>
							</>
						) : (
							<span className={classNames(s['price'])}>{`${price} ₽`}</span>
						)}
					</div>

					{isProductInCart ? (
						<CartCounter productId={id} />
					) : (
						<ProductCartCounter
							product={product}
							onAddToCart={(cartProduct: CartProduct) => {
								dispatch(cartActions.addCartProduct(cartProduct));
							}}
						/>
					)}

					{/* Оптимистичный лайк — UI меняется мгновенно до ответа сервера */}
					<LikeButton product={product} />

					<div className={classNames(s['product__delivery'])}>
						<div className={classNames(s['product__icon'])}>
							<img
								src={TruckSvg}
								alt='truck'
								style={{ width: 40, height: 40 }}
							/>
						</div>
						<div className={classNames(s['product__right'])}>
							<h3 className={classNames(s['product__name'])}>
								Доставка по всему Миру!
							</h3>
							<p className={classNames(s['product__text'])}>
								Доставка курьером — <span className='bold'> от 399 ₽</span>
							</p>
							<p className={classNames(s['product__text'])}>
								Доставка в пункт выдачи —
								<span className={classNames(s['product__bold'])}>
									{' '}
									от 199 ₽
								</span>
							</p>
						</div>
					</div>
					<div className={classNames(s['product__delivery'])}>
						<div className={classNames(s['product__icon'])}>
							<img
								src={QualitySvg}
								alt='quality'
								style={{ width: 40, height: 40 }}
							/>
						</div>
						<div className={classNames(s['product__right'])}>
							<h3 className={classNames(s['product__name'])}>
								Гарантия качества
							</h3>
							<p className={classNames(s['product__text'])}>
								Если Вам не понравилось качество нашей продукции, мы вернем
								деньги, либо сделаем все возможное, чтобы удовлетворить ваши
								нужды.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className={classNames(s['product__box'])}>
				<h2 className={classNames(s['product__title'])}>Описание</h2>
				<p className={classNames(s['product__subtitle'])}>Описание demo</p>
				<h2 className={classNames(s['product__title'])}>Характеристики</h2>
				<div className={classNames(s['product__grid'])}>
					<div className={classNames(s['product__naming'])}>Вес</div>
					<div className={classNames(s['product__description'])}>
						1 шт 120-200 грамм
					</div>
					<div className={classNames(s['product__naming'])}>Цена</div>
					<div className={classNames(s['product__description'])}>
						490 ₽ за 100 грамм
					</div>
					<div className={classNames(s['product__naming'])}>Польза</div>
					<div className={classNames(s['product__description'])}>
						<p>
							Большое содержание аминокислот и микроэлементов оказывает
							положительное воздействие на общий обмен веществ собаки.
						</p>
						<p>Способствуют укреплению десен и жевательных мышц.</p>
						<p>
							Развивают зубочелюстной аппарат, отвлекают собаку во время смены
							зубов.
						</p>
						<p>
							Имеет цельную волокнистую структуру, при разжевывание получается
							эффект зубной щетки, лучше всего очищает клыки собак.
						</p>
						<p>Следует учесть высокую калорийность продукта.</p>
					</div>
				</div>
			</div>
			<ReviewList product={product} />
		</>
	);
};

ProductPageInner.displayName = 'ProductPage';

export const ProductPage = ProductPageInner;
