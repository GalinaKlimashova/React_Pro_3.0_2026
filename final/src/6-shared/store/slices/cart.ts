import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
	products: CartProduct[];
}

const createInitState = (): CartState => ({
	products: [],
});

export const cartSlice = createSlice({
	name: 'cart',
	initialState: createInitState(),
	reducers: {
		addCartProduct(state, action: PayloadAction<CartProduct>) {
			const existing = state.products.find((p) => p.id === action.payload.id);
			if (existing) {
				existing.count += action.payload.count;
			} else {
				state.products = [...state.products, action.payload];
			}
		},
		deleteCartProduct(state, action: PayloadAction<CartProduct['id']>) {
			state.products = state.products.filter((p) => p.id !== action.payload);
		},
		setCartProductCount(
			state,
			action: PayloadAction<Pick<CartProduct, 'id' | 'count'>>
		) {
			state.products = state.products.map((p) => ({
				...p,
				count: p.id === action.payload.id ? action.payload.count : p.count,
			}));
		},
	},
	selectors: {
		getCartProducts: (state: CartState) => state.products,
		getCartProductIds: (state: CartState) => state.products.map((p) => p.id),
	},
});

export const cartActions = { ...cartSlice.actions };
export const cartSelectors = cartSlice.selectors;
