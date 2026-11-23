import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../types';

export type ProductsState = {
	sort: Sort;
	page: number;
	perPage: number;
	searchText: string;
};

const initialState: ProductsState = {
	searchText: '',
	sort: 'all',
	page: 1,
	perPage: 6,
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setSort: (state, action: PayloadAction<Sort>) => ({
			...state,
			sort: action.payload,
		}),
		setSearchText: (state, action: PayloadAction<string>) => ({
			...state,
			searchText: action.payload,
		}),
		setPage: (state, action: PayloadAction<number>) => ({
			...state,
			page: action.payload,
		}),
		incrementPage: (state) => ({
			...state,
			page: state.page + 1,
		}),
		setRefresh: (state) => ({
			...state,
			page: 1,
		}),
	},

	selectors: {
		getSort: (state: ProductsState) => state.sort,
		getSearchText: (state: ProductsState) => state.searchText,
		getPage: (state: ProductsState) => state.page,
		getPerPage: (state: ProductsState) => state.perPage,
		getProductsState: (state: ProductsState) => state,
	},
});

export const productsActions = { ...productsSlice.actions };

// Memoized selectors typed for RootState (compatible with useAppSelector)
const selectProductsState = (state: RootState) => state.products;

export const productsSelectors = {
	getSort: createSelector([selectProductsState], (s) => s.sort),
	getSearchText: createSelector([selectProductsState], (s) => s.searchText),
	getPage: createSelector([selectProductsState], (s) => s.page),
	getPerPage: createSelector([selectProductsState], (s) => s.perPage),
	getProductsState: createSelector([selectProductsState], (s) => s),
};
